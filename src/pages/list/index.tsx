import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '商品列表'
    }

    render() {
        return <View className='view'></View>
    }
}
