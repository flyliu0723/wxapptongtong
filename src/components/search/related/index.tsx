import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface Props {
    list: string[]
    onClick: (keyword: string) => void
}

export default class Page extends Component<Props> {
    static defaultProps = {
        list: []
    }

    render() {
        if (this.props.list.length === 0) {
            return null
        }
        return (
            <View className='related'>
                {this.props.list.map((item) => {
                    return (
                        <Text
                            className='item'
                            key={item}
                            onClick={() => this.props.onClick(item)}
                        >
                            {item}
                        </Text>
                    )
                })}
            </View>
        )
    }
}
