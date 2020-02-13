// 支付页推荐商品

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any[]
}

export default class Page extends Component<Props> {
    static defaultProps = {
        data: []
    }

    render() {
        if (this.props.data.length === 0) {
            return null
        }

        return (
            <View className='pay-recommend'>
                <View className='title'>推荐商品</View>
                <View className='list'>
                    {this.props.data.map((item) => {
                        return (
                            <View
                                className='item'
                                key={item.goodsid}
                                onClick={() => {
                                    Taro.navigateTo({
                                        url: `/pages/detail/index?goodsid=${item.goodsid}`
                                    })
                                }}
                            >
                                <Image src={item.goodsurl} className='img' />
                                <View className='name'>{item.goodsname}</View>
                                <Text className='price'>¥{item.sellprice}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}
