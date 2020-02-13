import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Textarea, Image, Input } from '@tarojs/components'
// import http from '../../utils/http'
// import auth from '../../utils/auth'
import './index.scss'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '订单商品'
    }
    state: {
        storeList: any
    } = {
        storeList: []
    }
    componentWillMount() {
        Taro.getStorage({ key: 'goodsList' }).then((d) => {
            this.setState({
                storeList: d.data
            })
        })
    }
    componentWillUnmount() {
        Taro.removeStorage({ key: 'goodsList' })
    }
    renderGoods(g) {
        return (
            <View className='goods-tab' key={g.goodsid}>
                <Image className='img' src={g.goodsurl} />
                <View className='message'>
                    <View className='title'>{g.goodsname}</View>
                    <View className='other'>
                        <Text className='price'>
                            ￥<Text className='font'>{g.sellprice}</Text>
                        </Text>
                        <Text className='num'>x{g.purchasenum}</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        let { storeList } = this.state
        return (
            <View className='view'>
                {storeList.map((s) => {
                    return (
                        <View className='storehouse' key={s.addressid}>
                            <View className='top'>
                                <View className='name'>
                                    <Image
                                        src='//timgs-v1.tongtongmall.com/e0b55c70'
                                        className='store-logo'
                                    />
                                    {s.address}
                                </View>
                                <View className='tip'>{s.freebie}</View>
                            </View>
                            {s.data.map((d) => {
                                return this.renderGoods(d)
                            })}
                            <View className='top bottom'>
                                <View className='name'>
                                    小计：
                                    <Text className='sum-price'>
                                        ￥ {s.sum}
                                    </Text>
                                </View>
                                <View className='tip'>关税： {s.tariff}</View>
                            </View>
                        </View>
                    )
                })}

                <View className='actions'>
                    <View className='sum-price'>实付款：￥166.91</View>
                    <View className='btn' onClick={() => Taro.navigateBack()}>
                        返回订单
                    </View>
                </View>
            </View>
        )
    }
}
