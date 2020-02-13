import Taro, { Component } from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import './index.scss'
import http from '../../../utils/http'

interface Props {}

export default class Page extends Component<Props> {
    state = {
        defaultSearch: ''
    }

    componentDidMount() {
        http.get('public/search-defvalue').then((data) => {
            this.setState({
                defaultSearch: data.data.label
            })
        })
    }
    render() {
        return (
            <View
                className='index-search'
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/search/index'
                    })
                }}
            >
                <View className='con'>
                    <Icon size='16' type='search' className='icon' />
                    <Text className='text'>{this.state.defaultSearch}</Text>
                </View>
            </View>
        )
    }
}
