import Taro, { Component } from '@tarojs/taro'
import { View, Input, Icon, Text, Button, Image } from '@tarojs/components'
import './index.scss'

interface Props {}

export default class NoLogin extends Component<Props> {
    render() {
        return (
            <View className='nologin'>
                <View className='tips'>
                    <Text className='no-to-login-tip'>
                        如果已经有账号，您可以选择先登录
                    </Text>
                    <Button
                        className='to-login-btn'
                        onClick={() =>
                            Taro.navigateTo({ url: '/pages/auth/index' })
                        }
                    >
                        登录
                    </Button>
                </View>
                <View className='receiver'>
                    <View className='tab'>
                        <Text className='name'>收 货 人 ： </Text>
                        <Input className='input' placeholder='收货人姓名' />
                    </View>
                    <View className='tab'>
                        <Text className='name'>手 机 号 ： </Text>
                        <Input
                            className='input'
                            placeholder='请输入您的手机号'
                        />
                    </View>
                    <View className='tab'>
                        <Text className='name'>所在地区： </Text>
                        <Image
                            className='to'
                            src='//m.tongtongmall.com/style/img/gads1.png'
                        />
                    </View>
                    <View className='tab'>
                        <Text className='name'>详细地址： </Text>
                        <Input className='input' placeholder='收货人详细地址' />
                    </View>
                    <View className='tab'>
                        <Text className='name'>身份证号： </Text>
                        <Input
                            className='input'
                            placeholder='您的身份证号码（选填）'
                        />
                    </View>
                    <View className='tips'>
                        海关清关需收货人姓名与身份证号一致并准确无误
                    </View>
                </View>
            </View>
        )
    }
}
