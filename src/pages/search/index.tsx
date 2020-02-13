import Taro, { Component, Config } from '@tarojs/taro'
import {
    View,
    Input,
    Icon,
    Swiper,
    SwiperItem,
    Image
} from '@tarojs/components'
import http from '../../utils/http'
import link from '../../utils/link'
import { name, swiper } from '../../utils/config'
import './index.scss'

import Record from '../../components/search/record'
import Related from '../../components/search/related'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '搜索'
    }

    state = {
        defaultSearch: '',
        searchHistory: [],
        value: '',
        related: [],
        hotSearch: [],
        slide: []
    }

    // 清空历史记录
    onClearHistory = () => {
        Taro.removeStorageSync(name.searchHistory)
        this.setState({
            searchHistory: []
        })
    }

    // 添加历史记录
    onAddHistory = (keyword: string) => {
        let history = Taro.getStorageSync(name.searchHistory) || []
        // 如果存在就删除 然后在最开始追加一个
        history = history.filter((item) => {
            return keyword !== item
        })
        history.unshift(keyword)
        Taro.setStorageSync(name.searchHistory, history)
    }

    // 更新历史记录
    onUpdateHistory = () => {
        this.setState({
            searchHistory: Taro.getStorageSync(name.searchHistory) || []
        })
    }

    componentDidMount() {
        this.onUpdateHistory()
        // 默认搜索词
        http.get('public/search-defvalue').then((data) => {
            this.setState({
                defaultSearch: data.data.label
            })
        })
        // 热门搜索
        http.get('public/hotsearch').then((data) => {
            this.setState({
                hotSearch: data.data.list.map((item) => {
                    return {
                        name: item.label,
                        link: item.link
                    }
                })
            })
        })
        // 轮播广告
        http.get('public/search-ad').then((data) => {
            this.setState({
                slide: data.data.list
            })
        })
    }

    onSearch = () => {
        if (this.state.value === '') {
            this.setState({
                related: []
            })
        } else {
            http.get('public/search-association', {
                keyword: this.state.value
            }).then((data) => {
                this.setState({
                    related: data.data.list.map((item) => item.label)
                })
            })
        }
    }

    render() {
        return (
            <View className='search'>
                <View className='input'>
                    <Input
                        placeholder={this.state.defaultSearch}
                        onInput={(e) => {
                            this.setState(
                                {
                                    value: e.detail.value
                                },
                                this.onSearch
                            )
                        }}
                    />
                    <Icon
                        size='20'
                        type='search'
                        className='icon'
                        onClick={() => {
                            const value =
                                this.state.value !== ''
                                    ? this.state.value
                                    : this.state.defaultSearch
                            Taro.navigateTo({
                                url: `/pages/list/index?search=${value}`
                            })
                        }}
                    />
                </View>

                <Related
                    list={this.state.related}
                    onClick={(keyword) => {
                        this.onAddHistory(keyword)
                        this.onUpdateHistory()
                        Taro.navigateTo({
                            url: `/pages/list/index?search=${keyword}`
                        })
                    }}
                />

                {this.state.searchHistory.length !== 0 && (
                    <Record
                        title='历史搜索'
                        data={this.state.searchHistory.map((item) => {
                            return {
                                name: item,
                                link: {
                                    type: 1,
                                    link: 'search',
                                    parameter: item
                                }
                            }
                        })}
                        onClear={this.onClearHistory}
                    />
                )}

                <Record title='热门搜索' data={this.state.hotSearch} />

                <Swiper
                    className='swiper'
                    autoplay
                    circular
                    interval={swiper.interval}
                    duration={swiper.duration}
                >
                    {this.state.slide.map((item: any) => {
                        return (
                            <SwiperItem
                                key={item.adurl}
                                onClick={() => link(item.action)}
                            >
                                <Image
                                    src={item.adurl}
                                    mode='aspectFill'
                                    className='img'
                                />
                            </SwiperItem>
                        )
                    })}
                </Swiper>
            </View>
        )
    }
}
