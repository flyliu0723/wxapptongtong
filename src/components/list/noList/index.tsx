import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    
}

export default class Page extends Component<Props> {
    static defaultProps = {

    }



    render() {
        return (
            <View className='result_no'>
                <View>
                    <Image className='img' src='//timgs-v1.tongtongmall.com/40ed761e' />
                    <View className='text'>
                        <Text>没有找到“”的搜索结果 \n 为您推荐以下商品</Text>
                    </View>
                </View>
            </View>
        )
    }
}
