// 快速导航组件

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { name } from '../../../utils/config'
import './index.scss'

export default class Page extends Component {
    state = {
        open: false,
        nav: [
            {
                name: '首页',
                icon: 'https://timgs-v1.tongtongmall.com/de89d7',
                path: '/pages/index/index'
            },
            // {
            //     name: '分类',
            //     icon:
            //         'https://timgs-v1.tongtongmall.com/94fe27',
            //     path: '/pages/category/index'
            // },
            {
                name: '购物车',
                icon: 'https://timgs-v1.tongtongmall.com/4bff4e',
                path: '/pages/cart/index'
            },
            {
                name: '个人中心',
                icon: 'https://timgs-v1.tongtongmall.com/77ec7e',
                path: '/pages/center/index'
            }
        ],
        y: Taro.getStorageSync(name.quickNav) || 300
    }

    render() {
        return (
            <View
                className={'quick' + (this.state.open ? ' open' : '')}
                style={{ top: this.state.y + 'px' }}
                onClick={() => {
                    this.setState({
                        open: !this.state.open
                    })
                }}
                onTouchStart={(e) => {
                    this.setState({
                        y: e.touches[0].pageY
                    })
                    console.log(e.touches[0].pageY)
                }}
                onTouchMove={(e) => {
                    this.setState({
                        y: e.touches[0].pageY
                    })
                }}
                onTouchEnd={() => {
                    Taro.setStorageSync(name.quickNav, this.state.y)
                }}
            >
                {/* 关闭时候的箭头 */}
                {!this.state.open && (
                    <View className='direction'>
                        <Image
                            src='https://timgs-v1.tongtongmall.com/083490'
                            className='icon'
                        />
                        <Text className='text'>
                            快速
                            <br />
                            导航
                        </Text>
                    </View>
                )}
                {/* 打开时候的箭头 */}
                {this.state.open && (
                    <View className='direction'>
                        <Image
                            src='https://timgs-v1.tongtongmall.com/cca7eb'
                            className='icon'
                        />
                        {this.state.nav.map((item) => {
                            return (
                                <View
                                    key={item.name}
                                    className='item'
                                    onClick={() => {
                                        Taro.navigateTo({
                                            url: item.path
                                        })
                                    }}
                                >
                                    <Image src={item.icon} className='img' />
                                    <Text className='text'>{item.name}</Text>
                                </View>
                            )
                        })}
                    </View>
                )}
            </View>
        )
    }
}
