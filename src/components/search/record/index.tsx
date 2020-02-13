import Taro, { Component } from '@tarojs/taro'
import { View, Icon, Text } from '@tarojs/components'
import link, { APILinkType } from '../../../utils/link'
import './index.scss'

interface Props {
    title: string
    data: {
        name: string
        link: APILinkType
    }[]
    onClear?: () => void
}

export default class Page extends Component<Props> {
    static defaultProps = {
        data: []
    }

    render() {
        return (
            <View className='record'>
                <View className='title'>
                    <Text>{this.props.title}</Text>
                    {this.props.onClear !== undefined && (
                        <Icon
                            size='20'
                            type='clear'
                            onClick={this.props.onClear}
                        />
                    )}
                </View>
                <View className='list'>
                    {this.props.data.map((item) => {
                        return (
                            <Text
                                key={item.name}
                                className='item'
                                onClick={() => link(item.link)}
                            >
                                {item.name}
                            </Text>
                        )
                    })}
                </View>
            </View>
        )
    }
}
