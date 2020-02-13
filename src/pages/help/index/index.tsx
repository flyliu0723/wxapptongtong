import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import http from '../../../utils/http'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '使用帮助'
    }

    state = {
        list: []
    }

    componentDidMount() {
        http.get('public/category-article-list').then((data) => {
            console.log(data.data.list)
            this.setState({
                list: data.data.list
            })
        })
    }

    render() {
        return (
            <View className='help'>
                {this.state.list.map((item: any) => {
                    return (
                        <View key={item.name}>
                            <View className='title'>{item.name}</View>
                            <View className='group' key={item.name}>
                                {item.child.map((data) => {
                                    return (
                                        <View
                                            key={data.articleid}
                                            className='item'
                                            onClick={() =>
                                                Taro.navigateTo({
                                                    url: `/pages/help/detail/index?id=${data.articleid}`
                                                })
                                            }
                                        >
                                            <View className='left'>
                                                {data.title}
                                            </View>
                                            <Image
                                                src='https://timgs-v1.tongtongmall.com/725e38f2'
                                                className='right'
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}
