import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Icon, Image, Button } from '@tarojs/components'
import './index.scss'
import http from '../../utils/http'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '专题'
    }

    componentDidMount() {}

    render() {
        return <View className='topic'>专题页面</View>
    }
}
