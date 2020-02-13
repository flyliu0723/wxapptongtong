import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '优惠券'
    }

    render() {
        return <View className='view'></View>
    }
}
