import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}

export default class Page extends Component<Props> {
    state = {}

    // 状态显示
    statusShow = (e) => {
        switch (e) {
            case '0':
                return '订单审核中'
                break
            case '10':
                return '等待付款'
                break
            case '13':
                return '支付确认中'
                break
            case '14':
                return '支付失败'
                break
            case '20':
                return '已付款'
                break
            case '30':
                return '已付款'
                break
            case '40':
                return '已发货'
                break
            case '45':
                return '待提货'
                break
            case '50':
                return '交易关闭'
                break
            case '60':
                return '已完成'
                break
        }
    }

    // 时间转换
    transformTime = (e) => {
        let time = String(e)
        return (
            time.substring(0, 4) +
            '-' +
            time.substring(4, 6) +
            '-' +
            time.substring(6, 8) +
            ' ' +
            time.substring(8, 10) +
            ':' +
            time.substring(10, 12) +
            ':' +
            time.substring(12, 14)
        )
    }

    //付款文字
    payContent = (val) => {
        if (val == 0 || val == 1 || val == 10 || val == 13 || val == 14) {
            return '应付款'
        } else {
            return '实付款'
        }
    }

    render() {
        const { data } = this.props
        return (
            <View className='goods'>
                <View className='goods_top'>
                    <Text className='time'>
                        {this.transformTime(data.time)}
                    </Text>
                    <Text className='status'>
                        {this.statusShow(data.orderstatus)}
                    </Text>
                </View>
                <View className='goods_center'>
                    {data.goods.length === 1 ? (
                        <View className='goods_one'>
                            <View className='goods_img'>
                                <Image
                                    className='img'
                                    src={data.goods[0].gpurl}
                                />
                            </View>
                            <View className='goods_msg'>
                                <Text className='name'>{data.goods[0].gn}</Text>
                                <Text className='other'>
                                    &yen;
                                    <Text className='money'>
                                        {data.goods[0].gp}
                                    </Text>
                                    <Text className='num'>
                                        x{data.goods[0].n}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View className='goods_more'>
                            <View className='goods_img'>
                                {data.goods.slice(0, 3).map((k, i) => (
                                    <Image
                                        key={i}
                                        className='img'
                                        src={k.gpurl}
                                    />
                                ))}
                            </View>
                            <View className='goods_msg'>
                                {data.goods.length > 3 && <Text>...</Text>}共
                                {data.goods.length}件商品
                            </View>
                        </View>
                    )}
                </View>
                <View className='goods_bottom'>
                    <Text className='price'>
                        {this.payContent(data.orderstatus)}：
                        <Text className='price_num'>&yen;{data.price}</Text>
                    </Text>
                    <Button className='goods_btn'>提醒发货</Button>
                </View>
            </View>
        )
    }
}
