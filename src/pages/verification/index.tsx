import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Textarea, Input } from '@tarojs/components'
import http from '../../utils/http'
import './index.scss'

export default class Page extends Component {
    state: {
        
    } = {

    }

    config: Config = {
        navigationBarTitleText: '身份验证'
    }

    componentDidMount() {
       
    }
    render() {
        return (
            <View className='verification'>
                <View className='title'>
                    请补充订单真实身份验证
                </View>
                <View className='show'>
                    <Image src='' className='banner' />
                    <View className='tips'>根据规定,您购买得跨境商品需要您提供真实信息来进行报关</View>
                </View>
                <View className='order'>
                    订单号：<Text className='num'>34121</Text>
                </View>
                <View className='options'>
                    <View className='name'>收货人</View>
                    <Input className='value' placeholder='收货人' />
                </View>
                <View className='options'>
                    <View className='name'>联系电话</View>
                    <Input className='value' placeholder='联系电话' />
                </View>
                <View className='options'>
                    <View className='name'>身份证</View>
                    <Input className='value' placeholder='必须和收货人姓名一样' />
                </View>
                <View className='tips'>
                    您的身份信息将被加密直接发送给海关，我们会为您保护隐私
                </View>
                <View className='action'>
                    提交报关
                </View>
            </View>
        )
    }
}
