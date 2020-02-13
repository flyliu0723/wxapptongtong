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
                type: 1,
                title: '全部'
            },
            {
                type: 2,
                title: '待付款'
            },
            {
                type: 5,
                title: '待发货'
            },
            {
                type: 3,
                title: '待收货'
            },
            {
                type: 4,
                title: '待评价'
            }
        ],
        data: [],
        status: 1,
        page: 1
    }

    config: Config = {
        navigationBarTitleText: '订单列表'
    }

    componentDidMount() {
        this.getData(1, 1)
    }

    getData = (type, page) => {
        http.get('order/myorderlist-ver2', {
            orderstatus: type,
            pagesize: 10,
            curpage: page
        }).then((d) => {
            this.setState({
                data: d.data.list
            })
        })
    }

    changeType = (e) => {
        this.setState(
            {
                status: e
            },
            () => {
                this.getData(e, 1)
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
