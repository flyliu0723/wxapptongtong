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
    addCart(goodsid) {
        
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
                                <Image src={item.pic} className='img' />
                                {Number(item.stock) === 0 && (
                                    <View className='sold'>
                                        <View className='mc'>售罄</View>
                                    </View>
                                )}
                            </View>
                            <Text className='name'>{item.title}</Text>
                            <View className='price'>
                                <View className='font'>
                                    ¥{item.sellprice}
                                    {
                                        item.originalprice !== ''
                                            ? <Text className='original'>{item.originalprice}</Text>
                                            : ''
                                    }
                                </View>
                                <View className='add-cart' onClick={() => this.addCart(item.goodsid)}></View>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}
