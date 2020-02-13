import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import { name } from './utils/config'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
    config: Config = {
        pages: [
            'pages/index/index',
            'pages/address/edit/index',
            'pages/address/list/index',
            'pages/detail/index',
            'pages/detail/detail/index',
            'pages/detail/assess/index',
            'pages/checkorder/index',
            'pages/checkorder/coupon/index',
            'pages/checkorder/goods/index',
            'pages/auth/index',
            'pages/cart/index',
            'pages/category/index',
            'pages/center/index',
            'pages/coupon/index',
            'pages/follow/index',
            'pages/list/index',
            'pages/order/index',
            'pages/search/index',
            'pages/pay/index',
            'pages/setting/index/index',
            'pages/setting/phone/index',
            'pages/help/index/index',
            'pages/help/detail/index',
            'pages/topic/index',
            'pages/place/index',
        ],
        tabBar: {
            color: '#232326',
            selectedColor: '#f23030',
            list: [
                {
                    text: '首页',
                    pagePath: 'pages/index/index',
                    iconPath: './assets/index.png',
                    selectedIconPath: './assets/index-active.png'
                },
                {
                    text: '分类',
                    pagePath: 'pages/category/index',
                    iconPath: './assets/category.png',
                    selectedIconPath: './assets/category-active.png'
                },
                {
                    text: '购物车',
                    pagePath: 'pages/cart/index',
                    iconPath: './assets/cart.png',
                    selectedIconPath: './assets/cart-active.png'
                },
                {
                    text: '我的',
                    pagePath: 'pages/center/index',
                    iconPath: './assets/center.png',
                    selectedIconPath: './assets/center-active.png'
                }
            ]
        },
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    }

    componentDidMount() {
        // 打开登录页存这个字段，如果非正常关闭登录页面则字段不会被删除 那么以后没办法打开登录页
        // 移除用于防止重复打开登录的字段
        Taro.removeStorageSync(name.authPageOpen)
    }

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return <Index />
    }
}

Taro.render(<App />, document.getElementById('app'))
