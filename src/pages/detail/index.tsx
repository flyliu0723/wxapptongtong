import Taro, { Component, Config } from '@tarojs/taro'
import {
    View,
    Text,
    Label,
    Image,
    Swiper,
    SwiperItem,
    Block
} from '@tarojs/components'
import http from '../../utils/http'
import auth from '../../utils/auth'
import './index.scss'
import { swiper } from '../../utils/config'
import Header from '../../components/detail/header'
import Promotion from '../../components/detail/promotion'
import Delivery from '../../components/detail/deliver'
import Brand from '../../components/detail/brand'
import RecommendGoods from '../../components/detail/recommendGoods'
import Bottom from '../../components/detail/bottom'
import PromotionModal from '../../components/detail/promotionModal'
import OptionModal from '../../components/detail/optionModal'
import AddressModal from '../../components/detail/addressModal'
import ServiceModal from '../../components/detail/serviceModal'
import OtherAddressModal from '../../components/detail/otherAddressModal'
import QuickNav from '../../components/@common/quick-nav'

export default class Page extends Component {
    state: {
        imgs: any
        goodsinfo: any
        price: any
        promotion: any
        distribution: any
        goodsid: string
        showPromotionModal: boolean
        showOptionModal: boolean
        showAddressModal: boolean
        showServiceModal: boolean
        showOtherAddressModal: boolean
        addressList: any
        recommendGoods: any
        inGoodsstand: any
        follow: boolean
        otherAddressList: any
        cartNum: number
    } = {
        imgs: [],
        goodsinfo: '',
        price: '',
        promotion: '',
        distribution: '',
        goodsid:
            this.$router.params.goodsid ||
            '94ec9637-5169-4dfd-9f6a-736642ea43fd',
        showPromotionModal: false,
        showOptionModal: false,
        showAddressModal: false,
        showServiceModal: false,
        showOtherAddressModal: false,
        addressList: [],
        recommendGoods: [],
        inGoodsstand: [],
        follow: false,
        otherAddressList: {},
        cartNum: 0
    }
    config: Config = {
        navigationBarTitleText: '商品详情'
    }
    componentWillMount() {
        this.prepareData()
        this.updateCartNum()
    }
    prepareData() {
        http.get('product/product-info-ver2', {
            goodsid: this.state.goodsid
        }).then((d) => {
            this.setState(
                {
                    goodsinfo: d.data,
                    imgs: d.data.goodsurl
                },
                () => {
                    auth.loginStatus && this.getDistributioninfo()
                    this.formatGoodsStand()
                }
            )
        })
        http.get('product/product-info-ver2-price', {
            specpropid: this.state.goodsid
        }).then((d) => {
            this.setState({
                price: d.data
            })
        })
        http.get('product/promotion', {
            goodsid: this.state.goodsid
        }).then((d) => {
            this.setState({
                promotion: d.data
            })
        })
        http.get('product/recommend-goods-goodsdetail', {
            goodsid: this.state.goodsid
        }).then((d) => {
            this.setState({
                recommendGoods: d.data.list
            })
        })
        
    }
    updateCartNum() {
         http.get('user/shoppingcart-count')
            .then(d => {
                this.setState({
                    cartNum: Number(d.data.count)
                })
            })
    }
    showOtherAddress() {
        http.get('public/get-addr-list')
            .then(d => {
                this.setState({
                    otherAddressList: d.data,
                    showOtherAddressModal: true
                })
            })
    }
    getDistributioninfo() {
        let distributioninfo = [
            'provname',
            'cityname',
            'countyname',
            'addr',
            'addrid'
        ]
        http.get('user/my-receipt-ads').then((d) => {
            this.setState({ addressList: d.data.list })
            d.data.list.forEach((a) => {
                if (a.isdefault === '1') {
                    let param = {}
                    distributioninfo.forEach((dis) => {
                        param[dis] = a[dis]
                    })
                    this.distributioninfo(param)
                }
            })
        })
    }
    distributioninfo(param) {
        console.log(param)
        http.post('product/distributioninfo', {
            ...param,
            goodsid: this.state.goodsinfo.productid
        }).then((d) => {
            this.setState({
                distribution: d.data
            })
        })
    }
    formatGoodsStand() {
        let goodsinfo = this.state.goodsinfo,
            inGoodsstand,
            follow
        goodsinfo.goodsstandard.forEach((d) => {
            if (d.gid === goodsinfo.goodsid) {
                inGoodsstand = d
                follow = !!Number(d.isattention)
            }
        })
        this.setState({ inGoodsstand, follow })
    }
    render() {
        let {
            imgs,
            goodsinfo,
            price,
            promotion,
            distribution,
            addressList,
            recommendGoods,
            inGoodsstand,
            goodsid
        } = this.state
        return (
            <View className='view'>
                <Header inTab='goods' goodsid={goodsid} goodstradestate={goodsinfo.goodstradestate}/>
                <View className='slide'>
                    <Swiper
                        className='slide-img'
                        indicatorColor='#E7EBEE'
                        indicatorActiveColor='#E60C12'
                        circular
                        indicatorDots
                        autoplay
                        duration={swiper.duration}
                        interval={swiper.interval}
                    >
                        {imgs.map((d: any, i) => {
                            return (
                                <SwiperItem key={i}>
                                    <Image src={d.url} />
                                </SwiperItem>
                            )
                        })}
                    </Swiper>
                    
                </View>
                {
                    inGoodsstand.goodsstate === '2'
                        ? <View className='out-tip'>
                            商品已下架，暂时为您推荐类似商品
                        </View>
                        : ''
                }

                {
                    inGoodsstand.goodsstate === '1'
                        ? <Block>
                            <View className='message'>
                            <Text className='price'>
                                <Text>￥</Text>
                                {price.pricevalue}
                            </Text>
                            <Text className='name'>{goodsinfo.goodsname}</Text>
                            <Text className='desc'>{goodsinfo.goodsdesc}</Text>
                        </View>
                        <Promotion
                            data={promotion}
                            onShow={() => this.setState({ showPromotionModal: true })}
                        />
                        <View
                            className='tab'
                            onClick={() => {
                                this.setState({ showOptionModal: true })
                            }}
                        >
                            <Text className='name'>已选</Text>
                            <View className='list'>{goodsinfo.goodsname}</View>
                            <Image src='//timgs-v1.tongtongmall.com/ef40daf1' />
                        </View>
                        <Delivery
                            data={distribution}
                            show={() => this.setState({ showAddressModal: true })}
                            showService={() =>
                                this.setState({ showServiceModal: true })
                            }
                        />
                        <Brand data={goodsinfo.goodsbrand} />
                        <RecommendGoods data={recommendGoods} />
                        <View
                            className='go-detail'
                            onClick={() =>
                                Taro.navigateTo({
                                    url: '/pages/detail/detail/index?goodsid=' + goodsid
                                })
                            }
                        >
                            图文详情
                        </View>
                        <Bottom
                            cartNum={this.state.cartNum}
                            followed={this.state.follow}
                            addcart={() => {
                                if(false){
                                    this.setState({ showOptionModal: true })
                                }else {
                                    if(inGoodsstand.stock === '0'){
                                        Taro.showToast({
                                            title: `库存不足`,
                                            icon: 'none'
                                        })
                                        return
                                    }
                                    http.post('user/shopping-cart-add-ver2', {
                                        goods: [
                                            {
                                                itemid: goodsid,
                                                type: 10,
                                                buycount: 1
                                            }
                                        ]
                                    }).then((d) => {
                                        Taro.showToast({
                                            title: '成功加入购物车',
                                            icon: 'none'
                                        })
                                        this.updateCartNum()
                                    })
                                }
                            }}
                            buy={() => {
                                this.setState({ showOptionModal: true })
                            }}
                            follow={() => {
                                let url = 'user/my-follow-products-add',
                                    params: any = {
                                        goods: [goodsid]
                                    }
                                if (this.state.follow) {
                                    url = 'user/my-follow-products-del'
                                    params = {
                                        goodsids: [goodsid]
                                    }
                                }
                                http.post(url, params).then((d) => {
                                    this.setState({
                                        follow: !this.state.follow
                                    })
                                })
                            }}
                        />
                        </Block>
                        : <RecommendGoods data={recommendGoods} />
                }
                

                {/* 弹窗类 */}
                {this.state.showPromotionModal ? (
                    <PromotionModal
                        data={promotion}
                        hide={() =>
                            this.setState({ showPromotionModal: false })
                        }
                    />
                ) : (
                    ''
                )}
                {this.state.showOptionModal ? (
                    <OptionModal
                        data={goodsinfo}
                        inGoodsstand={inGoodsstand}
                        price={price}
                        goodsid={this.state.goodsid}
                        hide={() => this.setState({ showOptionModal: false })}
                        changeGoods={(id) => {
                            if (id !== this.state.goodsid) {
                                Taro.navigateTo({
                                    url: '/pages/detail/index?goodsid=' + id
                                })
                            }
                        }}
                    />
                ) : (
                    ''
                )}
                {this.state.showAddressModal ? (
                    <AddressModal
                        data={addressList}
                        hide={() => this.setState({ showAddressModal: false })}
                        showOtherAddress={() => {
                            http.get('public/get-addr-list')
                                .then(d => {
                                    this.setState({
                                        otherAddressList: d.data,
                                        showOtherAddressModal: true,
                                        showAddressModal: false
                                    })
                                })
                        }}
                        changeAddress={(add) => {
                           this.distributioninfo({
                               addr: add.addr,
                               addrid: add.addrid,
                               cityname: add.cityname,
                               countyname: add.countyname,
                               provname: add.provname
                           }) 
                           this.setState({ showAddressModal: false })
                        }}
                    />
                ) : (
                    ''
                )}
                {this.state.showServiceModal ? (
                    <ServiceModal
                        data={distribution.service}
                        hide={() => this.setState({ showServiceModal: false })}
                    />
                ) : (
                    ''
                )}
                {
                    this.state.showOtherAddressModal ? 
                        <OtherAddressModal 
                            data={this.state.otherAddressList}
                            hide={() => this.setState({showOtherAddressModal: false})}
                            selected={() => {}}
                        />
                        : ''
                }
                <QuickNav />
            </View>
        )
    }
}
