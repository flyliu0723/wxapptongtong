import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

interface Props {
    addcart: any
    buy: any
    follow: any
    followed: boolean
    cartNum: number
}
export default class Bottom extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        inTab: ''
    }
    config: Config = {}
    render() {
        return (
            <View className='bottom'>
                <View className='option'>
                    <Image
                        className='img'
                        src='//timgs.tongtongmall.com/50fe06'
                    />
                    <Text className='font'>客服</Text>
                </View>
                <View
                    className='option'
                    onClick={() => Taro.switchTab({ url: '/pages/cart/index' })}
                >
                    <Image
                        className='img'
                        src='//timgs.tongtongmall.com/67a5d9'
                    />
                    <Text className='font'>购物车</Text>
                    {
                        this.props.cartNum > 0 ? <View className='cart-num'>
                            {this.props.cartNum > 99 ? '99+' : this.props.cartNum}
                        </View> : ''
                    }
                </View>
                <View className='option' onClick={() => this.props.follow()}>
                    <Image
                        className='img'
                        src={
                            this.props.followed
                                ? '//timgs.tongtongmall.com/19e39f'
                                : '//timgs.tongtongmall.com/19c208'
                        }
                    />
                    <Text className='font'>收藏</Text>
                </View>
                <Button className='cart btn' onClick={this.props.addcart}>
                    加入购物车
                </Button>
                <Button className='buy btn' onClick={this.props.buy}>
                    立即购买
                </Button>
            </View>
        )
    }
}
