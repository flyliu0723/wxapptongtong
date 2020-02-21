import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Textarea, Image, Input } from '@tarojs/components'
import http from '../../utils/http'
import auth from '../../utils/auth'
import './index.scss'
import NoLogin from '../../components/checkorder/noLogin'
import Address from '../../components/checkorder/address'
import Goods from '../../components/checkorder/goods'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '确认订单'
    }
    state: {
        comment: string
        useCoupon: string
        useFreightCoupon: string
        useScore: boolean
        orderData: any
        goodsList: any
        commentLength: number
        useScoreNum: string
    } = {
        comment: '',
        useScore: false,
        useCoupon: '',
        useFreightCoupon: '',
        orderData: '',
        goodsList: [],
        commentLength: 0,
        useScoreNum: '0'
    }
    componentDidMount() {
        this.checkOrder()
    }
    componentDidShow() {
        Taro.getStorage({ key: 'useCoupon' }).then((d) => {
            if(d.data.type === 0){
                this.setState({
                    useCoupon: d.data.id
                })
            }else {
                this.setState({
                    useFreightCoupon: d.data.id
                })
            }
            
        })
        this.checkOrder()
    }
    checkOrder() {
        if (this.$router.params.goodsid) {
            http.post('user/order-check-ver2', {
                ispick: '0',
                goods: [
                    {
                        itemid: this.$router.params.goodsid,
                        type: this.$router.params.type,
                        buycount: this.$router.params.buycount
                    }
                ]
            }).then((d) => {
                this.formateData(d.data)
            })
        } else {
            http.post('user/order-check-ver2').then((d) => {
                this.formateData(d.data)
            })
        }
    }
    formateData(data) {
        let goodsList = []
        data.goods.forEach((g) => {
            goodsList = goodsList.concat(g.data)
        })

        this.setState({
            orderData: data,
            goodsList
        })
    }
    getCouponList(type) {
        let coupon: any = []
        this.state.orderData && this.state.orderData.couponList && this.state.orderData.couponlist.forEach(c => {
            if(c.iscan === '1' && c.coupontype === type.toString()) coupon.push(c)
        })
        return coupon
    }
    choiceScore() {
        this.setState({ useScore: !this.state.useScore })
    }
    submit() {
        let param: any = {
            addr: this.state.orderData.address.addrid,
            addrtype: '0',
            coupon: this.state.useCoupon,
            freightcoupon: this.state.useFreightCoupon,
            invitecode: '',
            msg: this.state.comment,
            score: Number(this.state.useScoreNum),
            tk: 10,
            tags: []
        }
        if(this.$router.params.goodsid) {
            param.goods = [
                {
                    itemid: this.$router.params.goodsid,
                    type: this.$router.params.type,
                    buycount: this.$router.params.buycount
                }
            ]
        }
        
        http.post('user/order-submit-ver2', param).then((d) => {
            http.post('user/order-compute-ver2', {
                source: 2,
                list: d.data.list
            }).then((d) => {
                let ordersettlementid = d.data.list.reduce((o, n) => {
                    return o.ordersettlementid + '_' + n.ordersettlementid
                })
                Taro.navigateTo({
                    url: `pages/pay/index?ordersettlementid=${ordersettlementid}`
                })
            })
        })
    }
    render() {
        return (
            <View className='view'>
                {auth.loginStatus ? (
                    <Address data={this.state.orderData.address} />
                ) : (
                    <NoLogin />
                )}

                {this.state.goodsList.length > 0 ? (
                    <Goods
                        data={this.state.goodsList}
                        goList={() => {
                            Taro.navigateTo({
                                url: '/pages/checkorder/goods/index'
                            })
                            Taro.setStorage({
                                key: 'goodsList',
                                data: this.state.orderData.goods
                            })
                        }}
                    />
                ) : (
                    ''
                )}
                <View className='comment'>
                    <View className='title'>
                        <Text>给商家留言</Text>
                        <Text className='num'>
                            {this.state.commentLength}/50
                        </Text>
                    </View>
                    <Textarea
                        value={this.state.comment}
                        maxlength={50}
                        onInput={(e) => {
                            this.setState({
                                commentLength: e.detail.value.length,
                                comment: e.detail.value
                            })
                            return e.detail.value
                        }}
                    />
                </View>
                <View className='use'>
                    <Text className='name'>
                        商品优惠券
                        <Text>
                            [{this.getCouponList(0).length}张可用]
                        </Text>
                    </Text>
                    <View
                        className='to'
                        onClick={() => {
                            // if(this.getCouponList(0).length === 0) return
                            Taro.navigateTo({
                                url: '/pages/checkorder/coupon/index?type=0'
                            })
                            Taro.setStorage({
                                key: 'couponList',
                                data: this.state.orderData.couponlist
                            })
                        }}
                    >
                        {
                            this.state.useFreightCoupon === '' ? '未使用' : '[已选1张]'
                        }
                        
                        <Image src='//timgs-v1.tongtongmall.com/ef40daf1' />
                    </View>
                </View>
                {
                    this.getCouponList(2).length > 0
                        ? <View className='use'>
                            <Text className='name'>
                                运费优惠券
                                <Text>
                                    [{this.getCouponList(2).length}张可用]
                                </Text>
                            </Text>
                            <View
                                className='to'
                                onClick={() => {
                                    // if(this.getCouponList(2).length === 0) return
                                    Taro.navigateTo({
                                        url: '/pages/checkorder/coupon/index?type=2'
                                    })
                                    Taro.setStorage({
                                        key: 'couponList',
                                        data: this.state.orderData.couponlist
                                    })
                                }}
                            >
                                {
                                    this.state.useCoupon === '' ? '未使用' : '[已选1张]'
                                }
                                <Image src='//timgs-v1.tongtongmall.com/ef40daf1' />
                            </View>
                        </View>
                        : ''
                }
                
                <View className='use'>
                    <Text className='name'>
                        积分抵扣
                        <Text>[{this.state.orderData.myscore}分可用]</Text>
                    </Text>
                    <View className='to'>
                        <View
                            className={
                                this.state.useScore ? 'btn active' : 'btn'
                            }
                            onClick={() => this.choiceScore()}
                        >
                            <View></View>
                        </View>
                    </View>
                </View>
                {this.state.useScore ? (
                    <View className='use'>
                        <View className='name'>
                            使用
                            <Input
                                type='number'
                                value={this.state.useScoreNum}
                                className='score'
                                onInput={(value) => {
                                    let v: any = value.detail.value
                                    let max =
                                        Number(this.state.orderData.score) >
                                        Number(
                                            Number(this.state.orderData.myscore)
                                        )
                                            ? Number(
                                                  Number(
                                                      this.state.orderData
                                                          .myscore
                                                  )
                                              )
                                            : Number(this.state.orderData.score)

                                    if (isNaN(v)) {
                                        this.setState({
                                            useScoreNum: ''
                                        })
                                        return ''
                                    } else if (Number(v) > max) {
                                        this.setState({
                                            useScoreNum: max
                                        })
                                        return max
                                    } else {
                                        this.setState({
                                            useScoreNum: Number(v).toString()
                                        })
                                        return Number(v).toString()
                                    }
                                }}
                            />
                            积分，抵扣
                            {Number(this.state.useScoreNum) *
                                Number(this.state.orderData.scorerule)}
                            元钱，最高可用{this.state.orderData.score}积分
                        </View>
                    </View>
                ) : (
                    ''
                )}

                <View className='record'>
                    {this.state.orderData.detail.map((d, i) => {
                        return (
                            <View className='use' key={i}>
                                <Text className='name'>{d.label}</Text>
                                <Text className='to'>{d.value}</Text>
                            </View>
                        )
                    })}
                    {Number(this.state.useScoreNum) *
                        Number(this.state.orderData.scorerule) >
                    0 ? (
                        <View className='use'>
                            <Text className='name'>积分抵扣</Text>
                            <Text className='to'>
                                {'-' +
                                    Number(this.state.useScoreNum) *
                                        Number(this.state.orderData.scorerule)}
                            </Text>
                        </View>
                    ) : (
                        ''
                    )}
                </View>
                <View className='action'>
                    <View className='price'>
                        实付款：<Text>￥{this.state.orderData.pay}</Text>
                    </View>
                    <View className='submit' onClick={() => this.submit()}>
                        提交订单
                    </View>
                </View>
            </View>
        )
    }
}
