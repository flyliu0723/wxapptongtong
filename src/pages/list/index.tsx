import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import http from '../../utils/http'
import './index.scss'
import QuickNav from '../../components/@common/quick-nav'


import InputSearch from '../../components/list/inputSearch'
import BrandImg from '../../components/list/brand-img'
import SortFilter from '../../components/list/sortFilter'
import DoubleList from '../../components/index/goods-list'
import SingleList from '../../components/list/goods-list'
import NoList from '../../components/list/noList'

export default class Page extends Component {
    state = {
        titlename: '',
        inputFrom: true,
        search: this.$router.params.search ? this.$router.params.search : '',
        goodsData: [], // 商品列表数据
        isDouble: this.$router.params.double&& this.$router.params.double === '1' ? true : false,
        topheight: 0,
        hehe: false,
        imgshow: false,
        imgurl: {
            vurl: '',
            url: '',
            desc: ''
        },
        searchData: {
            global: this.$router.params.search ? 1 : 0,
            word: this.$router.params.search || '',
            all: 1,
            sell: 0,
            price: 0,
            coupon: this.$router.params.couponid || '',
            country: [],
            abroad: 0,
            have: 0,
            pagesize: 20,
            curpage: 1,
            brandid: this.$router.params.brandid ? [this.$router.params.brandid] : [],
            typeid: this.$router.params.classifyid ? this.$router.params.classifyid : '',
            tagid: this.$router.params.tagid ? this.$router.params.tagid : ''
        },
    }
    config: Config = {
        navigationBarTitleText: ''
    }


    onPageScroll(e){
        var that = this
        if(e.scrollTop >= that.state.topheight - 50){
            that.setState({
                hehe: true
            })
        }else if(e.scrollTop < that.state.topheight - 50){
            that.setState({
                hehe: false
            })
        }
    }

    

    getData = () => {
        // 商品列表数据
        http.post('public/searchver2', this.state.searchData).then(d => {
            if(d.data.url || d.data.vurl) {
                let imgurl = Object.assign({}, this.state.imgurl)
                imgurl.vurl = d.data.vurl
                imgurl.url = d.data.url
                imgurl.desc = d.data.desc
                this.setState({
                    imgshow: true,
                    imgurl,
                    titlename: d.data.name
                })
            }
            this.setState({goodsData: d.data.list})
            console.log(this.state.searchData.curpage)
            Taro.setNavigationBarTitle({
                title: d.data.name
            })
        })
    }

    searchVal = (val) => {
        this.setState({
            searchData: val
        }, () => {
            this.getData()
        })
    }

    topHeight = () => {
        Taro.createSelectorQuery().select('.navfilter').boundingClientRect(rect => {
            this.setState({
                topheight: rect.top
            })
        }).exec()
    }


    componentDidMount() {
        this.getData()
        
    }

    render() {
        const { inputFrom, search, isDouble, goodsData, hehe, imgshow, searchData, imgurl } = this.state
        return <View className='view'>
            <InputSearch bnFrom={inputFrom} search={search} />
            <View className='top-nav'>
                {imgshow && <BrandImg imgurl={imgurl} bnLoad={(val) => this.setState({topheight: val})} />}
                {
                    goodsData.length > 0 &&
                    <View className={!hehe && imgshow ? 'navfilter navbar' : 'navfilter nav-fixed'}>
                        <SortFilter
                            getdata={this.searchVal}
                            bnDouble={() => this.setState({isDouble: !this.state.isDouble})}
                            isdouble={isDouble}
                            searchdata={searchData}
                        />
                    </View>
                }
            </View>


            <QuickNav />

            {
                goodsData.length > 0 ?
                <View className={!hehe && imgshow ? 'goods-aa' : 'goods-top'}>
                    {
                        isDouble ?
                        <DoubleList data={goodsData} />:
                        <SingleList data={goodsData} />
                    }
                </View>
                : 
                <NoList />
            }

            

        </View>
    }
}
