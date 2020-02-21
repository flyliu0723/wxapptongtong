import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'
import http from '../../../utils/http'
import NumberInput from '../../../components/@common/numInput'

interface Props {
    hide: any
    data: any
    price: any
    goodsid: string
    inGoodsstand: any
    changeGoods: any
}
export default class Promotion extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {}
    state: {
        num: number
    } = {
        num: 1
    }
    config: Config = {}
    buynow() {
        Taro.navigateTo({
            url: `/pages/checkorder/index?goodsid=${this.props.goodsid}&buycount=${this.state.num}&type=10`
        })
    }
    addCart() {
        http.post('user/shopping-cart-add-ver2', {
            goods: [
                {
                    itemid: this.props.goodsid,
                    type: 10,
                    buycount: this.state.num
                }
            ]
        }).then((d) => {
            Taro.showToast({
                title: '成功加入购物车',
                icon: 'none'
            })
            this.props.hide()
        })
    }
    changeStand(id, data) {
        let index = -1,
            contain = this.props.inGoodsstand.contain
        data.forEach((d) => {
            if (contain.indexOf(d.id) > -1) index = contain.indexOf(d.id)
        })
        if (index < 0) return
        contain[index] = id
        this.props.data.goodsstandard.forEach((d) => {
            if (d.contain.join('.') === contain.join('.')) {
                this.props.changeGoods(d.gid)
            }
        })
    }
    render() {
        let { data, price, inGoodsstand } = this.props
        return (
            <View className='promotion'>
                <View className='content'>
                    <View className='goods-message'>
                        <Image src={data.goodsurl[0].url} className='img' />
                        <View className='goods'>
                            <View className='price'>
                                ￥
                                <Text className='big'>
                                    {price.pricevalue.split('.')[0]}.
                                </Text>
                                {price.pricevalue.split('.')[1]}
                            </View>
                            <View className='goods-num'>
                                商品编号：{data.sequence}
                            </View>
                        </View>
                        <Image
                            src='//timgs-v1.tongtongmall.com/30cb13d6'
                            className='close'
                            onClick={this.props.hide}
                        />
                    </View>
                    {data.goodsstandardele.map((d) => {
                        return (
                            <View className='kinds' key={d.standardlabel}>
                                <View className='name one-line'>
                                    {d.standardlabel}
                                </View>
                                <View className='option-tab'>
                                    {d.standarddata.map((stand) => {
                                        return (
                                            <Text
                                                className={
                                                    inGoodsstand &&
                                                    inGoodsstand.contain.indexOf(
                                                        stand.id
                                                    ) > -1
                                                        ? 'tab active'
                                                        : 'tab'
                                                }
                                                key={stand.id}
                                                onClick={() =>
                                                    this.changeStand(
                                                        stand.id,
                                                        d.standarddata
                                                    )
                                                }
                                            >
                                                {stand.desc}
                                            </Text>
                                        )
                                    })}
                                </View>
                            </View>
                        )
                    })}

                    <View className='options'>
                        <Text className='name'>数量：</Text>
                        <View className='con'>
                            <NumberInput
                                min={1}
                                max={100}
                                value={this.state.num.toString()}
                                change={(num) => {
                                    this.setState({ num })
                                }}
                            />
                        </View>
                    </View>
                    {
                        inGoodsstand.stock === '0'
                            ? <View className='actions'>
                                <View className='action no-stock'>
                                    到货提醒
                                </View>
                            </View>
                            :<View className='actions'>
                                <View
                                    className='action buy-now'
                                    onClick={() => this.buynow()}
                                >
                                    立即购买
                                </View>
                                <View
                                    className='action add-cart'
                                    onClick={() => this.addCart()}
                                >
                                    加入购物车
                                </View>
                            </View>
                    }
                    
                </View>
            </View>
        )
    }
}
