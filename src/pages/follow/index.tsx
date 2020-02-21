import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '../../utils/http'
import './index.scss'

import Goods from '../../components/follow/goods/index'
import Bottom from '../../components/follow/bottom/index'
import NoList from '../../components/follow/nolist/index'

export default class Page extends Component {
    state: {
        type: boolean
        dataList: any
        checkList: any
        page: number
        total: number
    } = {
        type: true,
        dataList: [],
        checkList: [],
        page: 1,
        total: 0
    }

    config: Config = {
        navigationBarTitleText: '我的关注'
    }

    // 编辑关注
    changeType = () => {
        this.setState({
            type: !this.state.type,
            checkList: []
        })
    }

    // 全选
    checkAll = (type) => {
        if (type) {
            let array = this.state.dataList.map((msg) => {
                return msg.goodsid
            })
            this.setState({ checkList: array })
        } else {
            this.setState({ checkList: [] })
        }
    }

    // 单选
    checkOne = (e, val) => {
        let list = Object.assign([], this.state.checkList)
        if (e) {
            list.indexOf(val) === -1 && list.push(val)
        } else {
            let num = list.indexOf(val)
            if (num > -1) {
                list.splice(num, 1)
            }
        }
        this.setState({ checkList: list })
    }

    getData = () => {
        http.get('user/my-follow-products', {
            curpage: this.state.page,
            pagesize: 10
        }).then((d) => {
            let list = this.state.dataList
            this.setState({
                dataList: this.state.page === 1 ? d.data.list : list.concat(d.data.list),
                total: d.data.total
            })
        })
    }

    delGoods = () => {
        let data = Object.assign([], this.state.dataList)
        let dataList = data.filter( item => {
            return this.state.checkList.every( val => {
                return item.goodsid != val
            })
        })
        this.setState({
            dataList,
            type: true,
            checkList: []
        })
    }

    onReachBottom = () => {
        if(this.state.dataList.length === (this.state.page * 10)) {
            setTimeout(() => {
                let pagenum = this.state.page + 1
                this.setState({
                    page: pagenum
                },() => {
                    this.getData()
                })
            }, 1000)
        }
    }

    empty = () => {
        this.setState({
            checkList: []
        })
    }

    componentDidMount() {
        this.getData()
    }



    render() {
        const { type, dataList, checkList, total } = this.state
        return (
            <View className='view'>
                {dataList.length > 0 ?
                    <View>
                        <View className='total'>
                            <Text>共{total}件商品</Text>
                            <View onClick={() => this.changeType()} className='edit'>
                                {type ? <Text>编辑</Text> : <Text>取消</Text>}
                            </View>
                        </View>

                        {/* 商品列表 */}
                        {dataList.map((data, i) => (
                            <Goods
                                key={i}
                                data={data}
                                type={type}
                                list={checkList}
                                checkGoods={this.checkOne}
                            />
                        ))}

                        {!type && (
                            <Bottom
                                checkAll={this.checkAll}
                                list={checkList}
                                data={dataList}
                                getdata={this.getData}
                                empty={this.empty}
                                delgoods={this.delGoods}
                            />
                        )}
                    </View>:
                    <NoList />
                }
            </View>
        )
    }
}
