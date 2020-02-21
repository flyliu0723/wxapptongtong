// 支付页推荐商品

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}

export default class Page extends Component<Props> {
    state = {
        
    }


    componentDidMount() {
        
    }


    payContent = (val) =>{
        if(val == 0 || val == 1 || val == 10 || val == 13 || val == 14){
            return '应付款'
        }else {
            return '实付款'
        }
    }

    render() {
        const { data } =  this.props
        return (
            <View className='detail'>
                <View className='list'>
                    支付方式<Text className='right'>在线支付</Text>
                </View>
                {
                    data.payment.map((item, i) => 
                        <View className='list' key={i}>
                            {item.label}<Text className='right'>{item.value}</Text>
                        </View>
                    )
                }
                <View className='list detail-total'>
                    {this.payContent(data.orderstatus)}：
                    <Text className='detail-price'>&yen;{data.price}</Text>
                </View>

                {
                    data.goods[0].data[0].type === '100' && 
                    <View className='leave-message'>
                        <View className='msg-title'>留言</View>
                        <View className='msg-con'>{data.message}</View>
                    </View>
                }

                {
                    data.message !== '' && 
                    <View className='message'>
                        <View className='msg-title'>买家留言</View>
                        <View className='msg-con'>{data.message}</View>
                    </View>
                }   
                
                
                
            </View>
        )
    }
}
