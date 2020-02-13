import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import GoodsList from '../goods-list'

interface Props {
    data: any[]
}

export default class Page extends Component<Props> {
    static defaultProps = {
        data: []
    }

    render() {
        return (
            <View className='index-hot'>
                <View className='top'>
                    <Image
                        src='https://timgs-v1.tongtongmall.com/5c0f85'
                        className='img'
                    />
                    <Text className='text'>精品推荐</Text>
                </View>
                <GoodsList data={this.props.data} />
            </View>
        )
    }
}
