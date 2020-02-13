import Taro from '@tarojs/taro'
import { name } from './config'

export default {
    // 获取登录状态
    get loginStatus() {
        return !!Taro.getStorageSync(name.userToken)
    },

    // 获取用户 token
    get userToken() {
        return Taro.getStorageSync(name.userToken)
    },

    // 设置/清空 用户 token
    set userToken(token: string | null) {
        if (token) {
            Taro.setStorageSync(name.userToken, token)
        } else {
            Taro.removeStorageSync(name.userToken)
        }
    },

    // 获取公共 token
    get authToken() {
        return Taro.getStorageSync(name.authToken)
    },

    // 设置/清空 公共 token
    set authToken(token: string | null) {
        if (token) {
            Taro.setStorageSync(name.authToken, token)
        } else {
            Taro.removeStorageSync(name.authToken)
        }
    }
}
