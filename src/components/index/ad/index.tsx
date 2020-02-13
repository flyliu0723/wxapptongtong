import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import link from '../../../utils/link'
import './index.scss'

interface Props {
    data: any[]
}

export default class Page extends Component<Props> {
    render() {
        const data = this.props.data

        return (
            <View className='index-ad'>
                {data[0] && (
                    <Image
                        src={data[0].pic}
                        className='top'
                        mode='aspectFill'
                        onClick={() => link(data[0])}
                    />
                )}
                {data[1] && data[2] && (
                    <View className='two'>
                        <Image
                            src={data[1].pic}
                            className='img left'
                            mode='aspectFill'
                            onClick={() => link(data[1])}
                        />
                        <Image
                            src={data[2].pic}
                            className='img'
                            mode='aspectFill'
                            onClick={() => link(data[2])}
                        />
                    </View>
                )}
            </View>
        )
    }
}
