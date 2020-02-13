import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import http from '../../../utils/http'
import { regexImage } from '../../../utils/config'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '加载中...'
    }

    state = {
        images: []
    }

    componentDidMount() {
        http.get('public/category-article-detail', {
            articleid: this.$router.params.id
        }).then((data) => {
            let images: string[] = []
            let matcher = data.data.content.match(regexImage)
            if (matcher) {
                matcher.forEach((item: any) => {
                    item && images.push(item)
                })
                this.setState({
                    images
                })
            }
            Taro.setNavigationBarTitle({
                title: data.data.title
            })
        })
    }

    render() {
        return (
            <View>
                {this.state.images.map((item) => {
                    return (
                        <Image
                            src={item}
                            key={item}
                            style={{ width: '100%' }}
                            mode='widthFix'
                        />
                    )
                })}
            </View>
        )
    }
}
