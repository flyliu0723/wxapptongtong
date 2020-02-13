import Taro, { Component } from '@tarojs/taro'
import {
    View,
    Input,
    Icon,
    Text,
    Button,
    Image,
    Label
} from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
    goList?: any
}

export default class Goods extends Component<Props> {
    render() {
        let { data, goList } = this.props
        return (
            <View className='goods'>
                {data.length === 1 ? (
                    <View className='one'>
                        <Image src={data[0].goodsurl} className='img' />
                        <View className='message'>
                            <View className='title'>{data[0].goodsname}</View>
                            <View className='other'>
                                <Text className='price'>
                                    ￥
                                    <Text className='first-price'>
                                        {data[0].sellprice.split('.')[0]}.
                                    </Text>
                                    {data[0].sellprice.split('.')[1]}
                                </Text>
                                <Text className='num'>
                                    x{data[0].purchasenum}
                                </Text>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View className='more' onClick={() => goList()}>
                        <View className='goods-list'>
                            {data.map((d, i) => {
                                if (i < 3) {
                                    return (
                                        <View className='tab' key={d.goodsid}>
                                            <Image
                                                src={d.goodsurl}
                                                className='goods-img'
                                            />
                                            <Text className='num'>
                                                x{d.purchasenum}
                                            </Text>
                                        </View>
                                    )
                                }
                            })}
                        </View>
                        <View className='summary'>
                            <Text className='goods-num-sum'>
                                ...共
                                {data
                                    .map((d) => Number(d.purchasenum))
                                    .reduce((p, c) => {
                                        return p + c
                                    })}
                                件商品
                            </Text>
                            <Image
                                src='//timgs-v1.tongtongmall.com/ef40daf1'
                                className='to'
                            />
                        </View>
                    </View>
                )}
            </View>
        )
    }
}
