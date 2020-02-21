import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Comy from '../comy'
import http from '../../../utils/http'

interface Props {
    getdata: any
    bnDouble: any
    isdouble: boolean
    searchdata: any
}

export default class Page extends Component<Props> {
    state = {
        //排序方式
        sort: {
            all: true,
            sell: false,
            price: {
                top: false,
                bottom: false
            },
            screen: false,
        },
        searchData: this.props.searchdata,
        showcom: false, // 筛选是否显示
        brandList: [], // 品牌列表
        countryList: [], // 国别列表
        brandName: '全部',
    }

    sortFalse(){
        let sort = {
            all: false,
            sell: false,
            price: {
                top: false,
                bottom: false
            },
            screen: false,
        }
        return sort
    }

    condition = (val, data?) => {
        let search = Object.assign({}, this.state.searchData)
        let sort = this.sortFalse()
        if(val === 'all') {
            sort.all = true
            search.sell = search.price = 0
            search.all = 1
        } else if(val === 'sell') {
            sort.sell = true
            search.all = search.price = 0
            search.sell = 1
        } else if(val === 'price') {
            search.all = search.sell = 0
            if(this.state.sort.price.top){
                sort.price.bottom = true
                search.price = 2
            }else{
                sort.price.top = true
                search.price = 1
            }
        } else if (val === 'screen'){
            sort.screen = true
            search.have = data.have
            search.abroad = data.abroad
            search.brandid = data.brandid
            this.setState({brandName: data.brandnames})
        }

        this.setState({
            sort,
            searchData: search
        }, () => {
            this.props.getdata(this.state.searchData)
        })
    }



    componentDidMount() {
        // 筛选列表数据
        let param = {
            word: '面膜',
            coupon: this.$router.params.couponid || '',
            country: [],
            abroad: '',
            have: '',
            brandid: this.$router.params.brandid ? [this.$router.params.brandid] : [],
            typeid: '',
            tagid: this.$router.params.tagid ? this.$router.params.tagid : ''
        }
        http.post('public/get-countrys-productbrand-list-ver2', param).then(d => {
            this.setState({
                brandList: d.data.allcoupon,
                countryList: d.data.allcountry
            })
        })

    }




    render() {
        const { sort, showcom, brandList, countryList, searchData, brandName } = this.state
        const { isdouble } = this.props
        return (
            <View>
                <View className='sort-filter'>
                    <View 
                        className={sort.all ? 'active nav': 'nav'}
                        onClick={() => this.condition('all')}
                    >
                        <Text>综合</Text>
                        <View className='triangle' />
                    </View>
                    <View
                        className={sort.sell ? 'active nav': 'nav'}
                        onClick={() => this.condition('sell')}
                    >
                        <Text>销量</Text>
                        <View className='triangle' />
                    </View>
                    <View
                        className={`nav ${sort.price.bottom && 'active'} ${sort.price.top && 'activetop'}`}
                        onClick={() => this.condition('price')}
                    >
                        <Text>价格</Text>
                        <View className='top_triangle' />
                        <View className='triangle bot_triangle' />
                    </View>
                    <View
                        className={sort.screen ? 'active nav': 'nav'}
                        onClick={() => this.setState({showcom: true})}
                    >
                        <Text>筛选</Text>
                        <View className='screen'>
                            <View className='square' />
                            <View className='triangle' />
                        </View>
                    </View>
                    <View className='line' />
                    <View
                        className={isdouble ? 'double is_double': 'double'}
                        onClick={() => this.props.bnDouble()}
                    />
                </View>

                {
                    showcom 
                    && 
                    <Comy 
                        screenshow={() => this.setState({showcom: false})}
                        brandid={searchData.brandid}
                        brandList={brandList}
                        countryList={countryList}
                        isHave={searchData.have ? true : false}
                        isAbroad={searchData.abroad ? true : false}
                        change={this.condition}
                        brandname={brandName}
                    />
                }
            </View>
        )
    }
}
