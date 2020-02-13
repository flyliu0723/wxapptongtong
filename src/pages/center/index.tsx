import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import http from '../../utils/http'
import auth from '../../utils/auth'
import { event, EventType } from '../../utils/event'
import './index.scss'

import Item from '../../components/center/item'
import Order from '../../components/center/order'
import User from '../../components/center/user'

export default class Page extends Component {
    state = {
        menu: [
            {
                name: '待付款',
                img:
                    '//timgs-v1.tongtongmall.com/31e153667c4b4b59a38b4b88a363658d',
                link: 'pages/order/index'
            },
            {
                name: '待发货',
                img:
                    '//timgs-v1.tongtongmall.com/023d5e62d6db4c7091224ffa37f02ac7',
                link: 'pages/order/index'
            },
            {
                name: '待收货',
                img:
                    '//timgs-v1.tongtongmall.com/e8c9b246c5434a7a88219e14ef9c474c',
                link: 'pages/order/index'
            },
            {
                name: '待评价',
                img:
                    '//timgs-v1.tongtongmall.com/fb45cdbe0d1448c5a0246804afb1d578',
                link: 'pages/order/index'
            },
            {
                name: '退款',
                img:
                    '//timgs-v1.tongtongmall.com/a975fee473614520b4dbb8003501e496',
                link: 'pages/order/index'
            }
        ],
        serve: [
            {
                name: '收货地址',
                img:
                    '//timgs-v1.tongtongmall.com/b155536faf6e4c2fa2938c2b6ebb28d1',
                path: '/pages/address/list/index'
            },
            {
                name: '使用帮助',
                img:
                    '//timgs-v1.tongtongmall.com/910c4ad994394822b7947578995b867c',
                path: '/pages/help/index/index'
            },
            {
                name: '联系客服',
                img:
                    '//timgs-v1.tongtongmall.com/d1cefdc9ff37409aadfed361a1b0af64'
            },
            {
                name: '设置',
                img:
                    '//timgs-v1.tongtongmall.com/6ae23fbbc4e448f69970c0a2926513b0',
                path: '/pages/setting/index/index'
            }
        ],
        userInfo: {
            headimg: '',
            showname: ''
        },
        userCenter: {
            scores: '',
            couponnum: ''
        }
    }

    config: Config = {
        navigationBarTitleText: '用户中心'
    }

    componentDidMount() {
        if (auth.loginStatus) {
            this.updateDate()
        } else {
            // 第一次进入页面 如果没有登录 则打开登录页
            Taro.navigateTo({
                url: '/pages/auth/index'
            })
        }

        // 登录成功
        event.on(EventType.loginSuccessful, () => {
            this.updateDate()
            setTimeout(() => {
                Taro.showToast({
                    title: '登录成功',
                    icon: 'success'
                })
            }, 500)
        })

        // 退出登录
        event.on(EventType.signOut, () => {
            setTimeout(() => {
                Taro.showToast({
                    title: '已退出登录',
                    icon: 'none'
                })
            }, 500)
            this.setState((state: any) => {
                state.userInfo.headimg = ''
                state.userInfo.showname = ''
                state.userCenter.scores = ''
                state.userCenter.couponnum = ''
                return state
            })
        })
    }

    // 获取数据
    updateDate = () => {
        http.get('user/user-info').then((d) => {
            this.setState({
                userInfo: d.data
            })
        })
        http.get('user/user-center').then((d) => {
            this.setState({
                userCenter: d.data
            })
        })
    }

    render() {
        const { menu, serve, userInfo, userCenter } = this.state
        return (
            <View className='view'>
                <View className='bg-color'>
                    {/* 顶部信息 */}
                    <User info={userInfo} center={userCenter} />

                    {/* 我的订单 */}
                    <View className='order'>
                        <Order menu={menu} class_name='order' />
                    </View>
                </View>

                <View className='bg-color'>
                    {/* 服务 */}
                    <Item menu={serve} class_name='service' />
                </View>
            </View>
        )
    }
}
