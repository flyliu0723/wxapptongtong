import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}
export default class Promotion extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {}
    state: {} = {}
    config: Config = {}
    render() {
        let { data } = this.props
        return (
            <View className='recommend'>
                <View className='title'>推荐商品</View>
                <ScrollView scrollX className='goods-list'>
                    {data.map((d) => {
                        return (
                            <View
                                className='goods'
                                onClick={() => {
                                    Taro.navigateTo({
                                        url:
                                            '/pages/detail/index?goodsid=' +
                                            d.goodsid
                                    })
                                }}
                            >
                                <Image className='img' src={d.goodsurl} />
                                <View className='name'>{d.goodsname}</View>
                                <View className='price'>
                                    ￥{' '}
                                    <Text className='big'>
                                        {d.sellprice.split('.')[0]}
                                    </Text>
                                    .{d.sellprice.split('.')[1]}
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}
