import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import auth from '../../../utils/auth'
import './index.scss'

interface Props {
    info: any
    center: any
}

export default class Page extends Component<Props> {
    state = {
        nopicture:
            '//timgs-v1.tongtongmall.com/33a8f7ddca2f4d6f82c20dc390e22e1b'
    }

    render() {
        const { nopicture } = this.state
        const { info, center } = this.props
        return (
            <View className='message'>
                {auth.loginStatus ? (
                    <View className='pic'>
                        <Image src={info.headimg ? info.headimg : nopicture} />
                        <Text className='line'>{info.showname}</Text>
                    </View>
                ) : (
                    <View className='pic'>
                        <Image src={nopicture} />
                        <Text
                            className='line'
                            onClick={() => {
                                Taro.navigateTo({
                                    url: '/pages/auth/index'
                                })
                            }}
                        >
                            登录/
                        </Text>
                        <Text className='line'>注册</Text>
                    </View>
                )}

                <View className='personal'>
                    <View
                        className='info'
                        onClick={() => {
                            Taro.navigateTo({
                                url: '/pages/follow/index'
                            })
                        }}
                    >
                        <Text className='info_txt'>38</Text>
                        <Text className='info_txt'>关注</Text>
                    </View>
                    <View className='info'>
                        {auth.loginStatus ? (
                            <Text className='info_txt'>{center.couponnum}</Text>
                        ) : (
                            <Text className='info_txt'>0</Text>
                        )}

                        <Text className='info_txt'>优惠券</Text>
                    </View>
                    <View className='info'>
                        {auth.loginStatus ? (
                            <Text className='info_txt'>{center.scores}</Text>
                        ) : (
                            <Text className='info_txt'>0</Text>
                        )}
                        <Text className='info_txt'>积分</Text>
                    </View>
                </View>
            </View>
        )
    }
}
