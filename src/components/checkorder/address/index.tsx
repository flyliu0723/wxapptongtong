import Taro, { Component } from '@tarojs/taro'
import {
    View,
    Input,
    Icon,
    Text,
    Button,
    Image,
    Block
} from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}

export default class Address extends Component<Props> {
    formatIdcard(val) {
        if (val.length === 15) {
            return val.replace(val.substring(6, 11), '*****')
        } else if (val.length === 18) {
            return val.replace(val.substring(6, 14), '********')
        }
    }
    render() {
        let { data } = this.props
        return (
            <View className='address'>
                {data.addrid === '' ? (
                    <Block>
                        <View onClick={() => Taro.navigateTo({url: '/pages/address/list/index'})}>请选择收货地址！</View>
                    </Block>
                ) : (
                    <Block>
                        <View className='user' onClick={() => Taro.navigateTo({url: '/pages/address/list/index'})}>
                            <Text className='name'>{data.name}</Text>
                            <Text className='phone'>
                                {data.phone.replace(
                                    data.phone.substring(3, 7),
                                    '****'
                                )}
                            </Text>
                        </View>
                        <View className='detail'>{data.addr}</View>
                        <View className='idcard'>
                            {this.formatIdcard(data.idcard)}
                        </View>
                        <Image
                            src='//timgs-v1.tongtongmall.com/ef40daf1'
                            className='to'
                        />
                    </Block>
                )}
            </View>
        )
    }
}
