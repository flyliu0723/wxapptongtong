import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import http from '../../utils/http'
import RecommendList from '../../components/pay/recommend'

enum PayStatus {
    success,
    wait,
    fail
}

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '支付'
    }
    orderID: string[] = []

    state = {
        payStatus: PayStatus.wait,
        recommend: []
    }

    componentDidMount() {
        this.orderID = this.$router.params.ordersettlementid.split('_')
        // 调用支付
        this.callPay()
        // 获取推荐商品
        http.get('product/recommend-goods-paysucess', {
            orderid: this.orderID[0]
        }).then((data) => {
            this.setState({
                recommend: data.data.list
            })
        })
    }

    // 调用支付
    callPay = () => {
        this.setState({
            payStatus: PayStatus.wait
        })
        http.post('pay/wechat-order-ver2', {
            from: 5,
            orderid: this.orderID,
            paytarget: ''
        })
            .then((res) => {
                // 下单成功 唤起支付
                const data = res.data
                Taro.requestPayment({
                    timeStamp: data.timestamp,
                    nonceStr: data.noncestr,
                    package: data.package,
                    signType: 'MD5',
                    paySign: data.sign,
                    success: () => {
                        // 支付成功 查询订单状态
                        this.queryPayStatus(data.orderid, data.orderpayid)
                    },
                    fail: () => {
                        // 支付失败 / 取消支付
                        this.setState({
                            payStatus: PayStatus.fail
                        })
                    }
                })
            })
            .catch((err) => {
                // 下单失败 判断是否需要重新授权
                if (err.code === 3001) {
                    Taro.login({
                        success: (data) => {
                            http.get('public/weixin-auth-lite', {
                                code: data.code
                            })
                                .then(() => {
                                    // 授权成功 重新支付
                                    this.callPay()
                                })
                                .catch((e) => {
                                    console.log(e)
                                    this.setState({
                                        payStatus: PayStatus.fail
                                    })
                                })
                        },
                        fail: (e) => {
                            console.log(e)
                            this.setState({
                                payStatus: PayStatus.fail
                            })
                        }
                    })
                } else {
                    console.log(err)
                    this.setState({
                        payStatus: PayStatus.fail
                    })
                }
            })
    }

    // 查询支付状态
    queryPayStatus(orderid: string, orderpayid: string) {
        const query = () => {
            http.post('pay/query-order-status', {
                orderid,
                orderpayid
            })
                .then((data) => {
                    if (data.data.status === 1) {
                        this.setState({
                            payStatus: PayStatus.success
                        })
                    } else {
                        setTimeout(query, 1000)
                    }
                })
                .catch((e) => {
                    this.setState({
                        payStatus: PayStatus.fail
                    })
                    console.log(e)
                })
        }
        query()
    }

    get payInfo() {
        if (this.state.payStatus === PayStatus.success) {
            return {
                icon: 'https://timgs-v1.tongtongmall.com/e102a90b',
                text: '支付成功'
            }
        }
        if (this.state.payStatus === PayStatus.fail) {
            return {
                icon: 'https://timgs-v1.tongtongmall.com/06dc65ce',
                text: '支付失败'
            }
        }
        return {
            icon:
                'https://timgs-v1.tongtongmall.com/3d37772823974b25bd7b45ec23d65daf',
            text: '支付中'
        }
    }

    get payButtonText() {
        if (this.state.payStatus === PayStatus.success) {
            return '继续购物'
        }
        if (this.state.payStatus === PayStatus.fail) {
            return '重新支付'
        }
        return '支付中'
    }

    onClickOrder = () => {
        if (this.state.payStatus !== PayStatus.wait) {
            Taro.navigateTo({
                url: '/pages/order/index'
            })
        }
    }

    // 点击高亮按钮
    onClickButton = () => {
        if (this.state.payStatus === PayStatus.success) {
            return Taro.navigateTo({
                url: '/pages/index/index'
            })
        }
        if (this.state.payStatus === PayStatus.fail) {
            return this.callPay()
        }
    }

    render() {
        const { icon, text } = this.payInfo

        return (
            <View className='pay'>
                <View className='state'>
                    <Image src={icon} className='img' />
                    <Text className='text'>{text}</Text>

                    <View className='button'>
                        <Button className='btn' onClick={this.onClickOrder}>
                            查看订单
                        </Button>

                        <Button
                            className='btn fill'
                            onClick={this.onClickButton}
                        >
                            {this.payButtonText}
                        </Button>
                    </View>
                </View>

                {/* 推荐商品列表 */}
                <RecommendList data={this.state.recommend} />
            </View>
        )
    }
}
