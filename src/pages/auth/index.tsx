import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input, Button, Text, Image } from '@tarojs/components'
import './index.scss'
import http from '../../utils/http'
import auth from '../../utils/auth'
import { name } from '../../utils/config'
import { event, EventType } from '../../utils/event'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '登录'
    }

    state = {
        phone: '17612182644',
        password: '123456',

        showPhoneLogin: false,
        disabledWechatSubmit: false,
        disabledPhoneSubmit: false
    }

    trigger = true

    componentWillUnmount() {
        // 移除用于防止重复打开登录页面的字段
        Taro.removeStorageSync(name.authPageOpen)
        // 通知上级 登录失败
        if (this.trigger) {
            let eventChannel = this.$scope.getOpenerEventChannel()
            eventChannel.emit('onAuthFail', {})
        }
    }

    // 登录成功 回退
    back = () => {
        this.trigger = false
        let eventChannel = this.$scope.getOpenerEventChannel()
        eventChannel.emit('onAuthSuccess', {})
        event.emit(EventType.loginSuccessful)
        Taro.navigateBack()
    }

    render() {
        return (
            <View className='auth'>
                <View className='tips'>
                    <Image
                        className='logo'
                        src='https://timgs-v1.tongtongmall.com/69391f1b40b24c89a87b230994d1863f'
                    />

                    <Text className='text'>只为美好生活</Text>

                    <Button
                        className='btn fill'
                        disabled={this.state.disabledWechatSubmit}
                        onClick={this.onWeChatLogin}
                    >
                        {this.state.disabledWechatSubmit
                            ? '登录中...'
                            : '微信登录'}
                    </Button>

                    <Button
                        className='btn'
                        onClick={() => {
                            this.setState({
                                showPhoneLogin: true
                            })
                        }}
                    >
                        手机号登录
                    </Button>
                </View>

                <View className='terms'>
                    注册/登录即表示同意
                    <Text
                        className='link'
                        onClick={() =>
                            Taro.navigateTo({
                                url: '/pages/help/index/index'
                            })
                        }
                    >
                        隐私政策
                    </Text>
                    和
                    <Text
                        className='link'
                        onClick={() =>
                            Taro.navigateTo({
                                url: '/pages/help/index/index'
                            })
                        }
                    >
                        服务条款
                    </Text>
                </View>

                {this.state.showPhoneLogin && (
                    <View
                        className='phone'
                        onClick={() => this.setState({ showPhoneLogin: false })}
                    >
                        <View
                            className='content'
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <Input
                                placeholder='手机号'
                                className='input'
                                value={this.state.phone}
                                onInput={(e) => {
                                    this.setState({
                                        phone: e.detail.value
                                    })
                                }}
                            />
                            <Input
                                placeholder='密码'
                                className='input'
                                value={this.state.password}
                                onInput={(e) => {
                                    this.setState({
                                        password: e.detail.value
                                    })
                                }}
                            />
                            <Button
                                className='btn fill submit'
                                onClick={this.onLogin}
                                disabled={this.state.disabledPhoneSubmit}
                            >
                                {this.state.disabledPhoneSubmit
                                    ? '登录中...'
                                    : '登录'}
                            </Button>
                        </View>
                    </View>
                )}
            </View>
        )
    }

    // 获取微信 昵称和头像
    getWechatUserInfo = (callBack) => {
        Taro.getUserInfo({
            success: (data) => {
                callBack({
                    avatarUrl: data.userInfo.avatarUrl,
                    nickName: data.userInfo.nickName
                })
            },
            fail: () => {
                callBack({
                    avatarUrl: '',
                    nickName: ''
                })
            }
        })
    }

    // 微信登录流程
    // 首先调用登录接口
    // 登录成功 -> 结束
    // 登录失败 -> 判断是否是 3002 -> 如果是 3002 那么调用 注册 -> 登录 接口
    onWeChatLogin = () => {
        this.setState({
            disabledWechatSubmit: true
        })

        Taro.login({
            success: (data) => {
                // 微信授权登录
                http.post('user/wx-lite-oauth-login', {
                    code: data.code
                })
                    .then((data) => {
                        // 登录成功
                        auth.userToken = data.data.key
                        this.back()
                    })
                    .catch((e) => {
                        // 登录失败
                        if (e.code !== 3002) {
                            console.log(e)
                            return this.setState({
                                disabledWechatSubmit: false
                            })
                        }
                        // 3002 用户未注册  获取用户信息 注册
                        this.getWechatUserInfo((userInfo) => {
                            http.post('user/wx-lite-oauth-reg', {
                                invitecode: '',
                                nickname: userInfo.nickName,
                                headimgurl: userInfo.avatarUrl
                            })
                                .then(() => {
                                    // 微信授权登录
                                    http.post('user/wx-lite-oauth-login', {
                                        code: data.code
                                    })
                                        .finally(() => {
                                            return this.setState({
                                                disabledWechatSubmit: false
                                            })
                                        })
                                        .then((data) => {
                                            // 登录成功
                                            auth.userToken = data.data.key
                                            this.back()
                                        })
                                })
                                .catch((e) => {
                                    console.log(e)
                                    return this.setState({
                                        disabledWechatSubmit: false
                                    })
                                })
                        })
                    })
            },
            fail: (e) => {
                console.log(e)
                this.setState({
                    disabledWechatSubmit: false
                })
            }
        })
    }

    onLogin = () => {
        // todo 自动填充用户的手机号
        // Taro.authorize({
        //     scope: 'scope.userInfo',
        //     success(e) {
        //         console.log(e)
        //     }
        // })
        this.setState({
            disabledPhoneSubmit: true
        })
        http.post('user/login', {
            tk: 10,
            loginname: this.state.phone,
            pwd: this.state.password,
            vercode: '',
            tag: ''
        })
            .finally(() => {
                this.setState({
                    disabledPhoneSubmit: false
                })
            })
            .then((data) => {
                auth.userToken = data.data.key
                this.back()
            })
            .catch((e) => {
                console.log(e)
            })
    }
}
