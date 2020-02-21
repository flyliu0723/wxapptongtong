import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
    type: boolean
    checkGoods: any
    list: any[]
}

export default class Page extends Component<Props> {
    state = {
        checked: false
    }

    componentWillReceiveProps(props) {
        let type = false
        props.list.forEach((item) => {
            if (item === this.props.data.goodsid) {
                type = true
            }
        })
        this.setState({ checked: type })
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

    checkGood = () => {
        this.setState(
            {
                checked: !this.state.checked
            },
            () => {
                this.props.checkGoods(
                    this.state.checked,
                    this.props.data.goodsid
                )
            }
        )
    }
    
    render() {
        const { data, type } = this.props
        const { checked } = this.state

        return (
            <View 
                className='goods'
                onClick={() => {
                    type ? Taro.navigateTo({
                        url: `/pages/detail/index?goodsid=${data.goodsid}`
                    }) : this.checkGood()
                }}
            >
                <View 
                    className='goods_img'
                >
                    {/* 选择 */}
                    {!type && (
                        <View
                            className={checked ? 'bn_check select' : 'bn_check'}
                        />
                    )}
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
                            {this.priceStrat(data.goodsprice)}
                        </Text>
                        {this.priceEnd(data.goodsprice)}
                    </Text>
                    <Text className='sales'>
                        {data.purchasenum}购买 {data.praiserate}%好评
                    </Text>
                </View>
            </View>
        )
    }
}
