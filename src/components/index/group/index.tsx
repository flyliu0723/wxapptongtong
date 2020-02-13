import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import link from '../../../utils/link'
import './index.scss'
import Goods from '../goods'

interface Props {
    data: {
        banner: any
        list: any[]
    }
}

export default class Page extends Component<Props> {
    static defaultProps = {
        data: {
            banner: {},
            list: []
        }
    }

    render() {
        const data = this.props.data
        return (
            <View className='index-group'>
                <Image
                    src={data.banner.pic}
                    mode='aspectFill'
                    className='banner'
                    onClick={() => link(data.banner)}
                />
                <ScrollView className='scroll' scrollX enableFlex>
                    {data.list.map((item) => {
                        return <Goods key={item.goodsid} data={item} />
                    })}
                    <View className='more' onClick={() => link(data.banner)}>
                        <View className='con'>查看更多</View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
