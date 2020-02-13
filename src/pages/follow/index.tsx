import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '../../utils/http'
import './index.scss'

import Goods from '../../components/follow/goods/index'
import Bottom from '../../components/follow/bottom/index'

export default class Page extends Component {
    state: {
        type: boolean
        dataList: any
        checkList: any
    } = {
        type: true,
        dataList: [],
        checkList: []
    }

    config: Config = {
        navigationBarTitleText: '我的关注'
    }

    // 编辑关注
    changeType = () => {
        this.setState({
            type: !this.state.type
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
            curpage: 1,
            pagesize: 10
        }).then((d) => {
            this.setState({
                dataList: d.data.list
            })
        })
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
        const { type, dataList, checkList } = this.state
        return (
            <View className='view'>
                <View className='total'>
                    <Text>共{dataList.length}件商品</Text>
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
                    />
                )}
            </View>
        )
    }
}
