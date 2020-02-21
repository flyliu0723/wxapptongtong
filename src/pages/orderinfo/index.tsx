import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import http from '../../utils/http'
import './index.scss'


import TopNav from '../../components/orderinfo/topnav'
import Goods from '../../components/orderinfo/goods'
import Detail from '../../components/orderinfo/detail'
import Bottom from '../../components/orderinfo/bottom'

export default class Page extends Component {
    state = {
        isshow: false,
        orderData: {
            goods: [],
        },
    }

    config: Config = {
        navigationBarTitleText: '订单详情'
    }

    

    componentDidMount() {
        let id = this.$router.params.orderid
        http.get(`order/orderdetail-ver2?ordersettlementid=${id}`).then(d => {
        
            this.setState({
                isshow: true,
                orderData: d.data
            })
        })
    }


    render() {
        const { orderData, isshow } = this.state
        return (
            <View className='view'>
                {
                    isshow && 
                    <View>
                        <TopNav data={orderData} />

                        <Goods data={orderData.goods} orderdata={orderData} />

                        <Detail data={orderData} />

                        <Bottom data={orderData} />
                    </View>
                }
                
            </View>
        )
    }
}
