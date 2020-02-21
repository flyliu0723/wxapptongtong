import Taro, { Component, Config, getCurrentPages } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import './index.scss'
import http from '../../../utils/http'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '设置手机号'
    }

    timer: any = null

    state = {
        phone: '',
        code: '',
        codeButtonText: '发送验证码',
        disabled: false
    }


    render() {
        return (
            <View className='setting-phone'>
                <View className='item'>
                    <Input className='input' placeholder='请输入手机号' type='number' maxLength={11} value={this.state.phone} onInput={(e) => {
                        this.setState({
                            phone: e.detail.value
                        })
                    }} />
                </View>
                <View className='item'>
                    <Input className='input' placeholder='请输入验证码' type='number' maxLength={6} value={this.state.code} onInput={(e) => {
                        this.setState({
                            code: e.detail.value
                        })
                    }}/>
                    <Button className='send' onClick={this.sendCode}>{this.state.codeButtonText}</Button>
                </View>
                <Button className='submit' onClick={this.onSubmit} disabled={this.state.disabled}>
                    {this.state.disabled ? '提交中...' : '确认'}
                </Button>
            </View>
        )
    }

    sendCode = () => {
        // 当前正处于等待阶段
        if (this.timer !== null) {
            return
        }
        if (!this.state.phone) {
            return Taro.showToast({
                title: '请填写手机号',
                icon: 'none'
            })
        } else if (!/1{1}\d{10}/.test(this.state.phone)) {
            return Taro.showToast({
                title: '手机号输入错误',
                icon: 'none'
            })
        }

        http.post('user/send-mobile-vcode', {
            phonenum: this.state.phone,
            type: 7
        }).then(() => {
            this.setInterval()
        })
    }

    setInterval = () => {
        let n = 60
        this.setState({
            codeButtonText: n + '秒后重发'
        })
        this.timer = setInterval(() => {
            n--
            if (n <= 0) {
                clearInterval(this.timer)
                this.setState({
                    codeButtonText: '重新发送'
                })
                this.timer = null
            } else {
                this.setState({
                    codeButtonText: n + '秒后重发'
                })
            }
        }, 1000)
    }

    onSubmit = () => {
        if (!this.state.phone) {
            return Taro.showToast({
                title: '请填写手机号',
                icon: 'none'
            })
        } else if (!/1{1}\d{10}/.test(this.state.phone)) {
            return Taro.showToast({
                title: '手机号输入错误',
                icon: 'none'
            })
        }

        if (!this.state.code) {
            return Taro.showToast({
                title: '请填写验证码',
                icon: 'none'
            })
        } else if (!/\d{6}/.test(this.state.code)) {
            return Taro.showToast({
                title: '验证码输入错误',
                icon: 'none'
            })
        }
        this.setState({
            disabled: true
        })
        http.post('user/account-add-mobile', {
            tk: 10,
            account: this.state.phone,
            vcode: this.state.code,
            newpwd: ''
        }).finally(() => {
            this.setState({
                disabled: false
            })
        }).then(() => {
            let eventChannel = this.$scope.getOpenerEventChannel()
            eventChannel.emit('onChangePhoneSuccess', {})

            let pages = getCurrentPages()
            if (pages.length >1) {
                let prevPage = pages[pages.length- 2]
                prevPage.onShow()
            }
            Taro.navigateBack()
        })
    }
}
