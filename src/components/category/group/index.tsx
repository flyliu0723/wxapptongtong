import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

interface Props {
    data: {
        typeid: string
        title: string
        picurl: string
        data: {
            typeid: string
            item: string
            itemurl: string
        }[]
    }
}

export default class Page extends Component<Props> {
    render() {
        const data = this.props.data

        return (
            <View className='category-group'>
                <View className='title'>
                    <Image
                        className='icon'
                        src={
                            'https://timgs-v1.tongtongmall.com/d06c0125574e436a9744b36200f44485'
                        }
                    />
                    <Text className='text'>{data.title}</Text>
                    <Text
                        className='more'
                        onClick={() => {
                            Taro.navigateTo({
                                url:
                                    '/pages/list/index?classifyid=' +
                                    data.typeid
                            })
                        }}
                    >
                        更多
                    </Text>
                </View>
                {data.data.length !== 0 && (
                    <View className='list'>
                        {data.data.map((item) => {
                            return (
                                <View
                                    className='item'
                                    key={item.typeid}
                                    onClick={() => {
                                        Taro.navigateTo({
                                            url:
                                                '/pages/list/index?classifyid=' +
                                                item.typeid
                                        })
                                    }}
                                >
                                    <Image className='img' src={item.itemurl} />
                                    <Text className='text'>{item.item}</Text>
                                </View>
                            )
                        })}
                    </View>
                )}
            </View>
        )
    }
}
