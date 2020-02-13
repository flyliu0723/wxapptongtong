import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {}

export default class Page extends Component<Props> {
    state = {}

    render() {
        return (
            <View>
                <Image
                    className='noorder_img'
                    src='//timgs-v1.tongtongmall.com/ca04daa0'
                />
                <Text className='noorder_text'>您还没有相关订单</Text>
            </View>
        )
    }
}
