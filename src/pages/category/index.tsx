import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import Group from '../../components/category/group'
import http from '../../utils/http'
import link from '../../utils/link'
import Search from '../../components/index/search'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '分类'
    }

    state = {
        hot: [],
        list: [],
        active: 0
    }

    componentDidMount() {
        // 热门推荐
        http.get('public/hot-recommend').then((data) => {
            console.log(data.data.list)
            this.setState({
                hot: data.data.list
            })
        })
        // 分类
        http.get('product/product-category').then((data) => {
            data.data.list.unshift({
                typeid: 0,
                title: '热门推荐',
                data: []
            })
            this.setState({
                list: data.data.list
            })
        })
    }

    render() {
        const cur = this.state.list[this.state.active] || { data: [] }
        return (
            <View className='category'>
                <Search />

                <View className='content'>
                    <View className='left'>
                        {this.state.list.map((item: any, i) => {
                            return (
                                <View
                                    className='item'
                                    key={item.typeid}
                                    style={{
                                        color:
                                            this.state.active === i
                                                ? '#f23030'
                                                : ''
                                    }}
                                    onClick={() => {
                                        this.setState({ active: i })
                                    }}
                                >
                                    {item.title}
                                </View>
                            )
                        })}
                    </View>

                    <View className='right'>
                        {/* 热门推荐 */}
                        {this.state.active === 0 && (
                            <View className='hot'>
                                {this.state.hot.map((item: any) => {
                                    return (
                                        <View
                                            key={item.title}
                                            onClick={() => link(item.action)}
                                            className='item'
                                        >
                                            <Image
                                                src={item.iconurl}
                                                className='img'
                                            />
                                            <Text className='text'>
                                                {item.title}
                                            </Text>
                                        </View>
                                    )
                                })}
                            </View>
                        )}

                        {/* 分类 */}
                        {this.state.active !== 0 &&
                            cur.data.map((item: any) => {
                                return <Group key={item.typeid} data={item} />
                            })}
                    </View>
                </View>
            </View>
        )
    }
}
