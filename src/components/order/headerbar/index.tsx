import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any[]
    status: number
    change: any
}

export default class Page extends Component<Props> {
    state = {}

    render() {
        const { data, status } = this.props
        return (
            <View className='header'>
                {data.map((val, i) => (
                    <View
                        className='header_nav'
                        key={i}
                        onClick={() => this.props.change(val.type)}
                    >
                        <Text
                            className={
                                val.type === status
                                    ? 'active header_txt'
                                    : 'header_txt'
                            }
                        >
                            {val.title}
                        </Text>
                    </View>
                ))}
            </View>
        )
    }
}
