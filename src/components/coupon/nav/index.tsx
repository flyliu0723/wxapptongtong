import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

interface Props {
    type: String
    check: any
}

export default class Page extends Component<Props> {
    state = {
        title: [
            {
                text: '未使用',
                type: '1'
            },
            {
                text: '已使用',
                type: '3'
            },
            {
                text: '已过期',
                type: '2'
            },
        ]
    }

    checkStatus = (val) => {
        this.props.check(val)
    }

    render() {
        const { title } = this.state
        const { type } = this.props
        return (
            <View className='nav'>
                {
                    title.map((item, i) => (
                        <View 
                            key={i}
                            className='nav-bar'
                        >
                            <Text
                                className={item.type === type ? 'active nav-text' : 'nav-text'}
                                onClick={() => this.checkStatus(item.type)} 
                            >{item.text}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }
}
