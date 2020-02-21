import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import http from '../../utils/http'
import './index.scss'
import NumberInput from '../../components/@common/numInput'
import auth from '../../utils/auth'

export default class Page extends Component {
    state: {
        cartData: any
        otherData: any
        allData: any
        count: number
        allChecked: boolean
        isSettle: boolean
        loaded: boolean
    } = {
        cartData: [],
        count: 0,
        allChecked: true,
        isSettle: false,
        loaded: false,
        otherData: '',
        allData: ''
    }
    config: Config = {
        navigationBarTitleText: '购物车'
    }
    componentWillMount() {
        this.setState({
            isSettle: false
        })
        this.prepareData()
    }
    componentDidShow() {
        this.prepareData()

    }
    prepareData() {
        http.get('user/my-shopping-cart-ver2').then((d) => {
            this.formatData(d.data.list)
            this.setState({
                otherData: {
                    coupon: d.data.coupon,
                    total: d.data.total,
                    loaded: true
                }
            })
        })
        http.get('user/shoppingcart-count').then((d) => {
            this.setState({ count: Number(d.data.count) })
        })
    }
    formatData(data) {
        let cartData: any = [],
            allData: any = []
        data.forEach((d) => {
            let store: any = {
                ...d,
                goods: []
            }
            d.data.forEach((g) => {
                if (g.type === '50') {
                } else {
                    store.goods.push(g)
                }
            })
            cartData.push(store)
        })
        cartData.forEach((store) => {
            allData = allData.concat(
                store.data.map((g) => {
                    return {
                        type: '10',
                        itemid: g.itemid,
                        entryid: g.entryid,
                        buycount: g.purchasenum
                    }
                })
            )
        })
        this.setState({
            cartData,
            allData
        })
    }
    updateCart(param) {
        http.post('user/shopping-cart-update-ver2', param).then((d) => {
            this.setState({
                otherData: {
                    coupon: d.data.coupon,
                    total: d.data.total
                }
            })
            this.formatData(d.data.list)
        })
    }
    getChecked(data) {
        let goods: any = []
        data.forEach((d) => {
            d.data.forEach((g) => {
                if(g.ischeck === '1'){
                    goods.push({
                        type: g.type,
                        itemid: g.itemid,
                        entryid: g.entryid,
                        buycount: g.purchasenum,
                        operatetype: '0'
                    })
                }
            })
        })
        return goods
    }
    renderCicle(type) {
        const { allData } = this.state
        return (
            <Image
                src={
                    type
                        ? '//timgs-v1.tongtongmall.com/1a7dcb69'
                        : '//timgs-v1.tongtongmall.com/73564d16'
                }
                className='choice-btn'
                onClick={() =>
                    this.updateCart({
                        goods: allData.map((d) => {
                            return {
                                ...d,
                                operatetype: type ? '2' : '1'
                            }
                        })
                    })
                }
            />
        )
    }
    isStoreChecked(store) {
        let result = true
        store.goods.forEach((d) => {
            if (d.ischeck === '0') {
                result = false
                return false
            }
        })
        if (!result && this.state.allChecked) {
            this.setState({
                allChecked: false
            })
        }
        return result
    }
    isAllChecked(data) {
        let result = true
        data.forEach((store) => {
            if (!this.isStoreChecked(store)) {
                result = false
                return false
            }
        })
        return result
    }
    isStoreNoChecked(store) {
        let result = false
        store.goods.forEach((d) => {
            if (d.ischeck === '1') {
                result = true
                return true
            }
        })
        return result
    }
    isAllNoChecked(data) {
        let result = false
        data.forEach((store) => {
            if (this.isStoreNoChecked(store)) {
                result = true
                return true
            }
        })
        return result
    }
    render() {
        let { cartData, otherData, allData, loaded } = this.state
        return (
            <View className='view'>
                {
                    !auth.loginStatus ? <View className='no-login'>
                        <View className='font'>登陆后可保存和同步购物车中商品</View>
                        <View className='action' onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/auth/index'
                            })
                        }}>登录</View>
                    </View> : ''

                }
                {
                    cartData.length > 0
                        ? <View className='settle'>
                            <View className='num'>共{allData.length}件商品</View>
                            <View className='btn' onClick={() => this.setState({isSettle: !this.state.isSettle})}>整理购物车</View>
                        </View>
                        : ''
                }
                {
                    cartData.length === 0
                        ? <View className='no-cart'>
                            <Image src='//timgs-v1.tongtongmall.com/28c263bd' className='tip-img' />
                            <View className='tip-font'>您的购物车空空如也</View>
                            <View className='btn' 
                                onClick={() => Taro.switchTab({url: '/pages/index/index'})}>去购物</View>
                        </View>
                        : ''
                }
                {cartData.map((store) => {
                    return (
                        <View className='store' key={store.addressid}>
                            <View className='store-name'>
                                <Image
                                    src={
                                        this.isStoreChecked(store)
                                            ? '//timgs-v1.tongtongmall.com/1a7dcb69'
                                            : '//timgs-v1.tongtongmall.com/73564d16'
                                    }
                                    className='choice-btn'
                                    onClick={() => {
                                        this.updateCart({
                                            goods: store.goods.map((g) => {
                                                return {
                                                    type: '10',
                                                    itemid: g.itemid,
                                                    entryid: g.entryid,
                                                    buycount: g.purchasenum,
                                                    operatetype: this.isStoreChecked(
                                                        store
                                                    )
                                                        ? '2'
                                                        : '1'
                                                }
                                            })
                                        })
                                    }}
                                />
                                <Image
                                    src='//timgs-v1.tongtongmall.com/e0b55c70'
                                    className='store-img'
                                />
                                <Text className='name'>{store.address}</Text>
                                <Text className='tip'>{store.freebie}</Text>
                            </View>
                            <View className='goods-list'>
                                {store.goods.map((g) => {
                                    return (
                                        <View className='goods' key={g.goodsid}>
                                            <View className='choice'>
                                                <Image
                                                    src={
                                                        g.ischeck === '1'
                                                            ? '//timgs-v1.tongtongmall.com/1a7dcb69'
                                                            : '//timgs-v1.tongtongmall.com/73564d16'
                                                    }
                                                    className='choice-btn'
                                                    onClick={() =>
                                                        this.updateCart({
                                                            goods: [
                                                                {
                                                                    type: '10',
                                                                    itemid:
                                                                        g.itemid,
                                                                    entryid:
                                                                        g.entryid,
                                                                    buycount:
                                                                        g.purchasenum,
                                                                    operatetype:
                                                                        g.ischeck ===
                                                                        '0'
                                                                            ? '1'
                                                                            : '2'
                                                                }
                                                            ]
                                                        })
                                                    }
                                                />
                                            </View>
                                            <View className='goods-tab'>
                                                <Image
                                                    className='goods-img'
                                                    src={g.goodsurl} 
                                                    onClick={() => {
                                                        Taro.navigateTo({
                                                            url: `/pages/detail/index?goodsid=${g.goodsid}`
                                                        })
                                                    }}
                                                />
                                                <View className='message'>
                                                    <View className='title' onClick={() => {
                                                        Taro.navigateTo({
                                                            url: `/pages/detail/index?goodsid=${g.goodsid}`
                                                        })
                                                    }}>
                                                        {g.goodsname}
                                                    </View>
                                                    <View className='other'>
                                                        <View className='price'>
                                                            ￥{g.sellprice}
                                                        </View>
                                                        <View className='num'>
                                                            {
                                                                this.state.isSettle
                                                                    ? <Image 
                                                                        src='//timgs-v1.tongtongmall.com/8b9c0822' 
                                                                        className='del' 
                                                                        onClick={() => {
                                                                            this.updateCart({
                                                                                goods:[{
                                                                                    type: g.type,
                                                                                    itemid: g.itemid,
                                                                                    entryid: g.entryid,
                                                                                    buycount: g.purchasenum,
                                                                                    operatetype: '0'
                                                                                }]
                                                                            })
                                                                        }}
                                                                    />
                                                                    : <NumberInput
                                                                        right={false}
                                                                        min={1}
                                                                        max={99}
                                                                        value={
                                                                            g.purchasenum
                                                                        }
                                                                        small={true}
                                                                        change={(num) =>
                                                                            this.updateCart(
                                                                                {
                                                                                    goods: [
                                                                                        {
                                                                                            type:
                                                                                                '10',
                                                                                            itemid:
                                                                                                g.itemid,
                                                                                            entryid:
                                                                                                g.entryid,
                                                                                            buycount: num,
                                                                                            operatetype:
                                                                                                '1'
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                            }
                                                            
                                                        </View>
                                                    </View>
                                                </View>
                                                {g.free.map((f) => {
                                                    return (
                                                        <View className='zp'>
                                                            <View className='name'>
                                                                <Text className='tip'>
                                                                    【赠品】
                                                                </Text>
                                                                {f.label}
                                                            </View>
                                                            <View className='num'>
                                                                X{f.count}
                                                            </View>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View className='sub'>
                                <View className='price'>
                                    小计：
                                    <Text className='font'>￥{store.sum}</Text>
                                </View>
                                {Number(store.tariff) > 0 ? (
                                    <View className='tax'>
                                        关税： ${store.tariff}
                                        <Image
                                            src='//timgs-v1.tongtongmall.com/a2d98bd9'
                                            className='img'
                                        />
                                    </View>
                                ) : (
                                    ''
                                )}
                            </View>
                        </View>
                    )
                })}
                <View style={{ height: '50px' }}></View>
                {
                    cartData.length > 0
                        ? <View className='actions'>
                            <View className='choice'>
                                {this.renderCicle(this.isAllChecked(cartData))}
                            </View>
        
                            <View className='sub'>
                                {
                                    this.state.isSettle
                                        ? <View className='all'>
                                            全选
                                        </View>
                                        : <Block>
                                            <View className='sub-price'>
                                                合 计：
                                                <Text className='font'>￥{otherData.total}</Text>
                                            </View>
                                            <View className='goods-price'>
                                                商品总额：
                                                {
                                                    Number(otherData.coupon) !== 0
                                                        ? '¥ ' + String(otherData.total) + ' - 立减 ¥ ' + otherData.coupon
                                                        : otherData.total
                                                }
                                            </View>
                                        </Block>
                                }
                                
                            </View>
                            {
                                this.state.isSettle
                                    ? <View
                                        className='submit'
                                        onClick={() => {
                                            if (this.isAllNoChecked(cartData)) {
                                                const {cartData} = this.state
                                                this.updateCart({
                                                    goods: this.getChecked(cartData)
                                                })
                                            } else {
                                                Taro.showToast({
                                                    title: '请选择商品',
                                                    icon: 'none'
                                                })
                                            }
                                        }}
                                    >
                                        移除
                                    </View>
                                    : <View
                                        className='submit'
                                        onClick={() => {
                                            if (this.isAllNoChecked(cartData)) {
                                                Taro.navigateTo({
                                                    url: '/pages/checkorder/index'
                                                })
                                            } else {
                                                Taro.showToast({
                                                    title: '请选择商品',
                                                    icon: 'none'
                                                })
                                            }
                                        }}
                                    >
                                        去结算（{this.state.count}）
                                    </View>
                            }
                            
                        </View>
                        : ''
                }
                
            </View>
        )
    }
}
