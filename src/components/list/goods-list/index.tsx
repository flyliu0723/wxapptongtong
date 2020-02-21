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

    priceStrat = (val) => {
        try {
            return val.split('.')[0] + '.'
        } catch (e) {
            return '00'
        }
    }

    priceEnd = (val) => {
        try {
            return val.split('.')[1]
        } catch (e) {
            return '00'
        }
    }


    render() {
        return (
            <View className='double'>
                {this.props.data.map((data) => {
                    return (
                        <View
                            key={data.goodsid}
                            className='goods-msg'
                            onClick={() => {
                                Taro.navigateTo({
                                    url: `/pages/detail/index?goodsid=${data.goodsid}`
                                })
                            }}
                        >
                            <View className='goods_img'>
                                <Image className='img' src={data.goodsurl} />
                                {/* 售罄 */}
                                {data.stock === '0' && <View className='label'>售罄</View>}
                                {data.stock === '0' && <View className='no-stock' />}
                            </View>

                            <View className='goods_text'>
                                <Text className='name'>{data.goodsname}</Text>
                                <Text className='profile'>{data.goodsdesc}</Text>
                                <Text className='price'>
                                    &yen;
                                    <Text className='money'>
                                        {this.priceStrat(data.sellprice)}
                                    </Text>
                                    {this.priceEnd(data.sellprice)}
                                </Text>
                                <Text className='sales'>
                                    {data.purchasenum}购买 {data.praiserate}%好评
                                </Text>
                            </View>
                        </View>
                    )
                })}

            </View>
        )
    }
}
