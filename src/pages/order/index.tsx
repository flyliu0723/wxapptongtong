import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import http from '../../utils//http'
import './index.scss'

import HeaderBar from '../../components/order/headerbar'
import Goods from '../../components/order/goods'
import NoOrder from '../../components/order/noOrder'

export default class Page extends Component {
    state = {
        headerbar: [
            {
                type: '1',
                title: '全部'
            },
            {
                type: '2',
                title: '待付款'
            },
            {
                type: '5',
                title: '待发货'
            },
            {
                type: '3',
                title: '待收货'
            },
            {
                type: '4',
                title: '待评价'
            }
        ],
        data: [],
        status: 1,
        page: 1,
        bnLoad: true
    }

    config: Config = {
        navigationBarTitleText: '订单列表'
    }

    componentDidMount() {
        let type = this.$router.params.type ? this.$router.params.type : '1'
        this.changeType(type)
    }

    onReachBottom = () => {
        if(this.state.data.length === (this.state.page * 10)) {
            let pagenum = this.state.page + 1
            this.setState({
                page: pagenum
            },() => {
                this.getData()
            })
        }
    }

    getData = () => {
        http.get('order/myorderlist-ver2', {
            orderstatus: this.state.status,
            pagesize: 10,
            curpage: this.state.page
        }).then((d) => {
            let list = this.state.data
            this.setState({
                data: this.state.page === 1 ? d.data.list : list.concat(d.data.list),
                bnLoad: true
            })
        })
    }

    changeType = (e) => {
        this.setState(
            {
                status: e,
                page: 1
            },
            () => {
                this.getData()
            }
        )
    }

    render() {
        const { headerbar, data, status } = this.state
        return (
            <View className='view'>
                {/* 导航 */}
                <HeaderBar
                    data={headerbar}
                    status={status}
                    change={this.changeType}
                />

                {/* 商品列表 */}
                {data.length > 0 ? (
                    data.map((item, i) => <Goods key={i} data={item} />)
                ) : (
                    <NoOrder />
                )}
            </View>
        )
    }
}
