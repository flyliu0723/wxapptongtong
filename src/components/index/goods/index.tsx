import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import link from '../../../utils/link'

interface Props {
    data: any
}

export default class Page extends Component<Props> {
    static defaultProps = {
        data: {}
    }

    render() {
        const data = this.props.data

        return (
            <View className='goods' onClick={() => link(data)}>
                <Image src={data.pic} mode='aspectFill' className='img' />
                <View className='name'>{data.title}</View>
                <View className='price'>{data.sellprice}</View>
            </View>
        )
    }
}
