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
        return (
            <View className='goods-list'>
                {this.props.data.map((item) => {
                    return (
                        <View
                            key={item.goodsid}
                            className='item'
                            onClick={() => {
                                Taro.navigateTo({
                                    url: `/pages/detail/index?goodsid=${item.goodsid}`
                                })
                            }}
                        >
                            <View className='image'>
                                <Image src={item.goodsurl} className='img' />
                                {Number(item.stock) === 0 && (
                                    <View className='sold'>
                                        <View className='mc'>售罄</View>
                                    </View>
                                )}
                                {Number(item.goodstradestate) !== 1 && (
                                    <Text className='all_country'>全球购</Text>
                                )}
                            </View>
                            <Text className='name'>{item.goodsname}</Text>
                            <View className='price'>¥{item.sellprice}</View>
                            <View className='buy'>
                                {Number(item.purchasenum) !== 0 && (
                                    <Text className='mr'>
                                        {item.purchasenum}人购买
                                    </Text>
                                )}
                                <Text>{item.praiserate}%好评</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}
