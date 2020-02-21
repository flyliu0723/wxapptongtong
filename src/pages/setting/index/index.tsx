import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import http from '../../../utils/http'
import auth from '../../../utils/auth'
import { event, EventType } from '../../../utils/event'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '设置'
    }

    state = {
        phone: '',
        imgurl: ''
    }

    componentDidShow() {
        http.get('user/user-info').then((data) => {
            this.setState({
                phone: data.data.phone || '绑定手机号',
                imgurl: data.data.headimg || '//timgs-v1.tongtongmall.com/4e448fea'
            })
        })
    }

    // 更改绑定手机号
    onChangePhone = () => {
        Taro.navigateTo({
            url: '/pages/setting/phone/index',
            events: {
                onChangePhoneSuccess() {
                    this.componentDidMount()
                    setTimeout(() => {
                        Taro.showToast({
                            title: '绑定成功',
                            icon: 'success'
                        })
                    }, 500)
                }
            }
        })
    }

    render() {
        return (
            <View className='setting'>
                <View className='top'>
                    <View className='left'>头像</View>
                    <Image
                        src={this.state.imgurl}
                        className='head'
                    />
                </View>
                <View className='group'>
                    <View className='item' onClick={this.onChangePhone}>
                        <View className='left'>手机号</View>
                        <View className='right'>
                            {this.state.phone}
                            <Image
                                src='https://timgs-v1.tongtongmall.com/725e38f2'
                                className='icon'
                            />
                        </View>
                    </View>

                    <View className='item'>
                        <View className='left'>实名认证</View>
                        <View className='right'>
                            设置
                            <Image
                                src='https://timgs-v1.tongtongmall.com/725e38f2'
                                className='icon'
                            />
                        </View>
                    </View>
                </View>
                <Button className='signout' onClick={this.onSignOut}>
                    退出登录
                </Button>
            </View>
        )
    }

    // 清空 token
    // 通知订阅方退出登录
    // 回到用户中心
    onSignOut = () => {
        auth.userToken = null
        event.emit(EventType.signOut)
        Taro.navigateBack()
    }
}
