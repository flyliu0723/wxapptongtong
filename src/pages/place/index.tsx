import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text, ScrollView } from '@tarojs/components'
import { swiper } from '../../utils/config'
import link from '../../utils/link'
import http from '../../utils/http'
import './index.scss'

import Menu from '../../components/index/menu'
import Goods from '../../components/index/goods'
import Group from '../../components/index/group'
import GoodsList from '../../components/place/goods-list'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '分会场'
    }

    state: {
        slide: any,
        menu: any,
        selection: any,
        activity: any,
        brand: any,
        recommend: any,
        hotRecommend: any,
        page: string
    } = {
        slide: [],
        menu: [],
        selection: [],
        activity: [],
        brand: [],
        recommend: {},
        hotRecommend: [],
        page: this.$router.params.goodsid || '日化分会场'
    }

    componentDidMount() {
        http.get('public/recommend-ver2', {
            placename: this.state.page + '.轮播图'
        }).then((data) => {
            this.setState({
                slide: data.data.list
            })
        })
        http.get('public/recommend-ver2', {
            placename: this.state.page + '.分类推荐'
        }).then((data) => {
            this.setState({
                menu: data.data.list.map(menu => {
                    return {
                        menu: menu.title,
                        icon: menu.pic,
                        link: {
                            type: menu.click,
                            link: menu.link
                        }
                    }
                })
            })
        })
        http.get('public/recommend-ver2', {
            placename: this.state.page + '.尖货秒杀'
        }).then((data) => {
            this.setState({
                selection: data.data.list
            })
        })
        http.get('public/recommend-ver2', {
            placename: this.state.page + '.活动专区'
        }).then((data) => {
            this.setState({
                activity: data.data.list[0]
            })
        })
        http.get('public/recommend-ver2', {
            placename: this.state.page + '.精选品牌'
        }).then((data) => {
            this.setState({
                brand: data.data.list[0]
            })
        })

        http.get('public/recommend-ver2', {
            placename: this.state.page + '.大图推荐1'
        }).then((img) => {
            let result = {
                banner: img.data.list[0],
                list: []
            }
            http.get('public/recommend-ver2', {
                placename: this.state.page + '.大图推荐1_商品列表'
            }).then((data) => {
                result.list = data.data.list
                this.setState({
                    recommend: result
                })
            })
        })
        http.get('public/recommend-ver2', {
            placename: this.state.page + '.热门推荐'
        }).then((data) => {
            this.setState({
                hotRecommend: data.data.list
            })
        })

    }
    render() {
        return (
            <View className='place'>
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
                                key={item.pic}
                            >
                                <Image
                                    src={item.pic}
                                    className='img'
                                    mode='aspectFill'
                                />
                            </SwiperItem>
                        )
                    })}
                </Swiper>
                
                <Menu data={this.state.menu} />

                <View className='tab'>
                    <View className='title selection'>
                        <Text className='line' />
                        <Text className='name'>
                            口碑精选
                        </Text>
                    </View>
                    <ScrollView className='scroll' scrollX enableFlex>
                        {this.state.selection.map((item) => {
                            return <Goods key={item.goodsid} data={item} />
                        })}
                    </ScrollView>
                </View>
                
                <View className='tab'>
                    <View className='title'>
                        <Text className='line' />
                        <Text className='name'>
                            活动专区
                        </Text>
                    </View>
                    <View className='image'>
                        <Image src={this.state.activity.pic} className='img' />
                    </View>
                </View>

                <Group data={this.state.recommend} key={this.state.recommend.banner.pic} />

                <View className='tab'>
                    <View className='title selection'>
                        <Text className='line' />
                        <Text className='name'>
                            热门推荐
                        </Text>
                    </View>
                    <GoodsList data={this.state.hotRecommend}/>

                </View>
            </View>
        )
    }
}
