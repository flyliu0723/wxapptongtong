import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import link from '../../../utils/link'
import './index.scss'

interface Props {
    data: any[]
}

export default class Page extends Component<Props> {
    static defaultProps = {
        data: []
    }

    render() {
        return (
            <View className='index-menu'>
                {this.props.data.map((item) => {
                    return (
                        <View
                            className='item'
                            key={item.menu}
                            onClick={() => link(item.link)}
                        >
                            <Image src={item.icon} className='img' />
                            <Text className='text'>{item.menu}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
}
