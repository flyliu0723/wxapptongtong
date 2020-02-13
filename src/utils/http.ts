import Taro from '@tarojs/taro'
import { apiConfig, name } from '../utils/config'
import auth from './auth'

const authorization = 'Basic ' + apiConfig.basic

let tokenPromise: Promise<string> | null = null

// 获取 token
const getToken = (): any => {
    // 现在有正在进行中的获取token
    if (tokenPromise !== null) {
        return tokenPromise
    }

    // 重新获取 token
    tokenPromise = new Promise((success, error) => {
        Taro.request({
            url: apiConfig.auth,
            method: 'POST',
            header: {
                Authorization: authorization,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: encodeURI('platform=HTML5&grant_type=client_credentials'),
            complete() {
                tokenPromise = null
            },
            success(response) {
                if (response.data.code === 1100) {
                    auth.authToken = response.data.access_token
                    success(response.data.access_token)
                } else {
                    Taro.showToast({
                        title: '获取token失败',
                        icon: 'none'
                    })
                    console.error(response.data)
                    error(response.data)
                }
            },
            fail(response) {
                console.error(response)
                Taro.showToast({
                    title: '调用token接口失败',
                    icon: 'none'
                })
            }
        })
    })
    return tokenPromise
}

interface APIdata {
    code: number
    data: {
        [index: string]: any
    }
    message: string
}

const send = (
    method: 'GET' | 'POST',
    url: string,
    data: any,
    token: string,
    callBack
) => {
    Taro.request({
        url: apiConfig.url + url,
        method,
        header: {
            ttm_token: token
        },
        data,
        success(response) {
            // 接口约定只有 1100 才算成功
            if (response.data.code === 1100) {
                return callBack.success(response.data)
            }

            // 刷新公共token
            // 重新生成一次token 然后重新请求当前接口
            if (response.data.token === 1107) {
                auth.authToken = null
                return getToken().then((token: string) => {
                    send(method, url, data, token, callBack)
                })
            }

            // 遇到以下状态码需要重新登录
            if ([1104, 1105, 1106, 1108].includes(response.data.code)) {
                // 判断当前是否已经打开了登录页面，防止同时调用接口重复打开登录页
                // 登录页离开的时候会删除这个值
                if (Taro.getStorageSync(name.authPageOpen) !== true) {
                    Taro.setStorageSync(name.authPageOpen, true)
                    auth.userToken = null
                    Taro.navigateTo({
                        url: '/pages/auth/index',
                        events: {
                            onAuthSuccess() {
                                // 用户重新登录成功了 重新调用一次当前接口
                                send(
                                    method,
                                    url,
                                    data,
                                    auth.userToken || '',
                                    callBack
                                )
                            },
                            onAuthFail() {
                                Taro.showToast({
                                    title: `请登录后再进行操作`,
                                    icon: 'none'
                                })
                            }
                        }
                    })
                }
                return
            }

            // 其他问题
            Taro.showToast({
                title: response.data.msg,
                icon: 'none'
            })

            console.error(response.data)
            callBack.error(response.data)
        },
        fail(response) {
            console.error(response)
        }
    })
}

const init = (
    method: 'GET' | 'POST',
    url: string,
    data: any
): Promise<APIdata> => {
    return new Promise((success, error) => {
        const token = auth.userToken || auth.authToken
        if (!token) {
            getToken().then((token: string) => {
                send(method, url, data, token, {
                    success,
                    error
                })
            })
        } else {
            send(method, url, data, token, {
                success,
                error
            })
        }
    })
}

const get = (url: string, data?: { [key: string]: any }) => {
    return init('GET', url, data || {})
}

const post = (url: string, data?: { [key: string]: any }) => {
    return init('POST', url, data || {})
}

export default {
    get,
    post
}
