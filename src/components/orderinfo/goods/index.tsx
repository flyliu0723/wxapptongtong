// 支付页推荐商品

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any[]
    orderdata: any
}

export default class Page extends Component<Props> {
    state = {
        
    }


    componentDidMount() {
        
    }


    getPrice = (val) => {
        let orderData = this.props.orderdata
        if(orderData.ordertype === '0' || orderData.ordertype === '50'){
            return val.unitrefundprice
            // 预售订单
        }else if(orderData.ordertype === '20'){
            // 定金
            if(val.type === '40' && val.predictprice !== '0' && orderData.predictobj.status === '10'){
                return val.predictprice
                // 尾款
            }else if(val.type === '40' && val.predictprice !== '0' && val.finalprice !== '0' && orderData.predictobj.status === '20'){
                return val.finalprice
                // 可退款价格
            }else {
                return val.unitrefundprice
            }
        }
    }

    // 金额前部分
    price = (val) => {
        try {
            return val.split('.')[0] + '.'
        } catch (e) {
            return '00'
        }
    }

    // 金额后部分
    priced = (val) => {
        try {
            return val.split('.')[1]
        } catch (e) {
            return '00'
        }
    }

    render() {
        const { data } = this.props
        return (
            <View>
                {data.map((item, i) => 
                    <View className='goods-list' key={i}>
                        <View className='title'>
                            <Text>订单商品（{item.address}）</Text>
                            <View className='link'>
                                联系客服
                                <Image src='//timgs-v1.tongtongmall.com/ee3d13bbeb4c4a3e85c648acc4b4f4b9' />
                            </View>
                        </View>
                        {item.data.map((val, j) => 
                            <View 
                                className='goods' 
                                key={j}
                                onClick={() => {
                                    Taro.navigateTo({
                                        url: `/pages/detail/index?goodsid=${val.goodsid}`
                                    })
                                }}
                            >
                                <Image src={val.goodsurl} />
                                <View className='goods-msg'>
                                    <View className='goodsname'>
                                        {val.type === '50' && <Text>【赠品】</Text>}
                                        {val.goodsname}
                                    </View>
                                    <View className='goodsnum'>
                                        <View className='price'>
                                            &yen;<Text className='price-front'>{this.price(this.getPrice(val))}</Text>
                                            {this.priced(this.getPrice(val))}
                                        </View>
                                        <Text className='price-sell'>&yen;{val.sellprice}</Text>
                                        <Text className='num'>X{val.purchasenum}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </View>
        )
    }
}
