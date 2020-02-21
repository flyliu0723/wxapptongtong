// 支付页推荐商品

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}

export default class Page extends Component<Props> {
    state = {
        text: '',
        imgurl: ''
    }

    orderStatus(val){
        let status = ''
        let imgurl = '//timgs-v1.tongtongmall.com/45728d02'
        switch (val.orderstatus){
        case '0':
            status = '订单审核中'
            break
            
        case '1':
            status = '审核未通过'
            break

        case '10':
            if(val.ordertype == 20 && val.predictobj.status == 20){
                status = '待支付尾款'
            }else{
                status = '等待付款'
            }
            break

        case '13':
            status = '支付中'
            break

        case '14':
            status = '支付失败'
            break

        case '20':
            status = '已付款'
            imgurl = '//timgs-v1.tongtongmall.com/27dc1560'
            break

        case '40':
            status = '已发货'
            imgurl = '//timgs-v1.tongtongmall.com/8b4513cc'
            break

        case '45':
            status = '待提货'
            break

        case '50':
            status = '交易关闭'
            imgurl = '//timgs-v1.tongtongmall.com/bfc8cb89'
            break

        case '60':
            status = '已完成'
            imgurl = '//timgs-v1.tongtongmall.com/0345b941'
            break
        }

        this.setState({
            text: status,
            imgurl
        })
    }

    componentDidMount() {
        this.orderStatus(this.props.data) 
    }

    render() {
        const { text, imgurl } = this.state
        const { data } = this.props
        return (
            <View className='top-nav'>
                <View className='order-state'>
                    <Image src={imgurl} className='img' />
                    <Text className='text'>{text}</Text>
                </View>
                {/* 订单信息 */}
                <View className='order-message'>
                    <View>
                        <Image className='icon' src='//timgs-v1.tongtongmall.com/dffc78be9df4457d9a7cd303d9d6e5b4' />
                        <Text className='msg'>订单号： {data.orderidshow}</Text>
                    </View>
                    <View className='text'>下单时间： {data.time}</View>
                </View>

                {/* 收货地址 */}
                {
                    data.ispick === '0' && 
                    <View className='order-message address'>
                        <View>
                            <Image className='icon' src='//timgs-v1.tongtongmall.com/95d1e6ce28c44d1e863b519f57d71880' />
                            <Text className='msg'>{data.addobj.name}</Text>
                            <Text className='msg'>  {data.addobj.phone}</Text>
                        </View>
                        <View className='text'>{ data.addobj.provname }{ data.addobj.cityname }{ data.addobj.countyname }{ data.addobj.addr }</View>
                        {data.addobj.idcard && <View className='text_second'>{data.addobj.idcard}</View>}
                    </View>
                }
                
            </View>
        )
    }
}
