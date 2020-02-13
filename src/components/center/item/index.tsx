import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

interface Props {
    menu: any[]
    class_name: string
}

export default class Page extends Component<Props> {
    render() {
        const { menu, class_name } = this.props

        return (
            <View className='item_msg'>
                <View className={class_name}>
                    <View className='tips'>
                        <Text className='title'>我的服务</Text>
                    </View>
                    <View className='item_list'>
                        {menu.map((msg, i) => (
                            <View
                                key={i}
                                className='list'
                                onClick={() => {
                                    Taro.navigateTo({
                                        url: msg.path
                                    })
                                }}
                            >
                                <Image className='icon' src={msg.img} />
                                <Text className='text'>{msg.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        )
    }
}
