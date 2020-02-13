import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import http from '../../utils/http'
import link from '../../utils/link'
import { swiper } from '../../utils/config'
import './index.scss'

import Search from '../../components/index/search'
import Menu from '../../components/index/menu'
import Ads from '../../components/index/ad'
import Notice from '../../components/index/notice'
import Group from '../../components/index/group'
import Recommend from '../../components/index/recommend'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '首页'
    }

    state = {
        slide: [],
        menu: [],
        ad: [],
        notice: [],
        group: [],
        recommend: [],
        page: 1
    }

    componentDidMount() {
        http.get('public/index-banner', {
            adtime: '',
            menutime: '',
            noticetime: '',
            showtime: ''
        }).then((data) => {
            this.setState({
                slide: data.data.adlist,
                menu: data.data.menulist,
                notice: data.data.noticelist
            })
        })

        http.get('public/recommend-ver4', {
            placename: '首页-三图专区'
        }).then((data) => {
            this.setState({
                ad: data.data.map((item) => {
                    return item.list[0]
                })
            })
        })

        http.get('public/recommend-ver4', {
            placename: '首页-多图楼层'
        }).then((data) => {
            this.setState({
                group: data.data.map((item) => {
                    return {
                        banner: item.list[0],
                        list: item.list.splice(1)
                    }
                })
            })
        })

        // todo
        // 滚动加载
        http.get('public/index-hotsinglegoods', {
            pagesize: 100,
            curpage: this.state.page
        }).then((data) => {
            this.setState({
                page: this.state.page + 1,
                recommend: data.data.list
            })
        })
    }

    render() {
        return (
            <View>
                <Search />

                <Swiper
                    autoplay
                    interval={swiper.interval}
                    duration={swiper.duration}
                    indicatorDots
                    indicatorActiveColor={'#fff'}
                    circular
                    className='index-swiper'
                >
                    {this.state.slide.map((item: any) => {
                        return (
                            <SwiperItem
                                className='item'
                                onClick={() => link(item.link)}
                                key={item.picurl}
                            >
                                <Image
                                    src={item.picurl}
                                    className='img'
                                    mode='aspectFill'
                                />
                            </SwiperItem>
                        )
                    })}
                </Swiper>

                <Menu data={this.state.menu} />

                <Ads data={this.state.ad} />

                <Notice data={this.state.notice} />

                {this.state.group.map((item: any) => {
                    return <Group data={item} key={item.banner.pic} />
                })}

                <Recommend data={this.state.recommend} />
                {this.state.recommend.length !== 0 && (
                    <View className='index-none'>到底了~</View>
                )}
            </View>
        )
    }
}
