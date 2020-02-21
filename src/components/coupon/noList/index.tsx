import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

interface Props {
    
}

export default class Page extends Component<Props> {
    state = {
        
    }

    

    render() {
        return (
            <View className='no-list'>
                <Image src='//timgs-v1.tongtongmall.com/4f0c936e' className='no-img' />
                <Text className='no-text'>暂无优惠券</Text>
            </View>
        )
    }
}
