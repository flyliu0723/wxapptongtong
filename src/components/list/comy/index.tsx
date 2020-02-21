import Taro, { Component } from '@tarojs/taro'
import { View, Text, Switch, Image, Button } from '@tarojs/components'
import './index.scss'

import Screen from '../screen'

interface Props {
    screenshow: any
    countryList: any[]
    brandList: any[]
    isHave: boolean
    isAbroad: boolean
    change: any
    brandid: any[]
    brandname: string
}

export default class Page extends Component<Props> {
    state : {
        titleText: string
        brandShow: boolean
        countryShow: boolean
        checkShow: boolean
        brandIds: any[]
        brandNames: String
        isHave: boolean
        isAbroad: boolean
    } = {
        titleText: '筛选',
        brandShow: false, // 品牌列表显示
        countryShow: false, // 国别列表显示
        checkShow: true, // 筛选页显示
        brandIds: this.props.brandid, // 选择品牌id
        brandNames: this.props.brandname, // 选择品牌名称
        isHave: this.props.isHave, // 是否有货
        isAbroad: this.props.isAbroad, //是否显示海外购
    }

    // 确定
    define = () => {
        if(this.state.checkShow) {
            this.props.screenshow()
            let data = {
                abroad: this.state.isAbroad ? 1 : 0,
                have: this.state.isHave ? 1 : 0,
                brandid: this.state.brandIds,
                brandnames: this.state.brandNames
            }
            this.props.change('screen', data)
        }
    }

    // 国别或品牌显示
    checkStatus = (val) => {
        this.setState({
            brandShow: val === 'brand' ? true : false,
            countryShow: true,
            checkShow: val === 'brand' ? false : true
        })
    }


    // 是否有货  海外购
    available = (e, val) => {
        if(val === 'have') {
            this.setState({isHave: e.detail.value})
        } else {
            this.setState({isAbroad: e.detail.value})
        }
    }


    // 品牌国别取消
    screenCancel = () => {
        this.setState({
            brandShow: false,
            countryShow: false,
            checkShow: true
        })
    }

    // 品牌国别确定
    screenOk = (e, val) => {
        let ids:any = []
        let nameTotal = val.length === 0 ? '全部' : ''
        val.length > 0 && val.map((item, i) => {
            let id = e === 'brand' ? item.couponid : item.countryid
            let name = e === 'brand' ? item.couponname : item.countryname
            ids.push(id)
            if(i < 2) {
                nameTotal += name + ' '
            } else if (i == 2){
                nameTotal += '...'
            }
        })


        if(e === 'brand') {
            this.setState({
                brandIds: ids,
                brandNames: nameTotal
            })
        }
    }


    // 重置选项
    resetAll = () => {
        this.setState({
            isHave: false,
            isAbroad: false,
            brandIds: [],
            brandNames: '全部'
        })
    }


    render() {
        const { titleText, brandShow, countryShow, checkShow, brandNames, brandIds } = this.state
        return (
            <View className='comy'>
                {
                    checkShow && 
                    <View className='comy_con'>
                        <View className='title'>
                            <Text 
                                className='float_left' 
                                onClick={() => this.props.screenshow()}
                            >
                                取消
                            </Text>
                            <Text>{ titleText }</Text>
                            <Text 
                                className='float_right' 
                                onClick={() => this.define()}
                            >
                                确定
                            </Text>
                        </View>
                        <View className='home_page'>
                            <View className='home_list'>
                                <View className='list_option'>
                                    仅显示有货
                                    <Switch 
                                        onChange={(e) => this.available(e, 'have')} 
                                        checked={this.state.isHave} 
                                        className='float_right' 
                                    />
                                </View>
                                <View className='list_option'>
                                    仅显示海外购商品
                                    <Switch 
                                        onChange={(e) => this.available(e, 'abroad')} 
                                        checked={this.state.isAbroad} 
                                        className='float_right' 
                                    />
                                </View>
                            </View>
                            <View className='home_list'>
                                <View 
                                    className='list_option'
                                    onClick={() => this.checkStatus('brand')}
                                >
                                    品牌
                                    <View className={brandIds.length > 0 ? 'float_right text_red' : 'float_right'}>
                                        {brandNames}
                                        <Image
                                            className='more'
                                            src='//m.tongtongmall.com/style/img/gads1.png'
                                        />
                                    </View>
                                </View>
                                <View 
                                    className='list_option'
                                    onClick={() => this.checkStatus('country')}
                                >
                                    国别
                                    <View className='float_right'>
                                        全部
                                        <Image
                                            className='more'
                                            src='//m.tongtongmall.com/style/img/gads1.png'
                                        />
                                    </View>
                                </View>
                            </View>
                            <Button className='reset' onClick={() => this.resetAll()}>
                                重置选项
                            </Button>
                        </View>
                    </View>
                }
                
                {/* 品牌列表 */}
                {
                    brandShow && 
                    <Screen 
                        data={this.props.brandList} 
                        ids={this.state.brandIds} 
                        cancel={this.screenCancel} 
                        type='brand' 
                        bnOk={this.screenOk} 
                    />
                }
            </View>
        )
    }
}
