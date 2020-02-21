import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'

import Nav from '../../../components/coupon/nav'
import NoList from '../../../components/coupon/noList'
import CouponItem from '../../../components/coupon/conponItem'

export default class Page extends Component {
    state = {
        couponList: [],
        type: '1',
        page: 1,
        delNum: ''
    }

    config: Config = {
        navigationBarTitleText: '优惠券'
    }


    getData = () => {
        http.get('user/my-privilege-card', {
            type: this.state.type,
            curpage: this.state.page,
            pagesize: 10
        }).then(d => {
            let list = this.state.couponList
            this.setState({
                couponList: this.state.page === 1 ? d.data.list : list.concat(d.data.list)
            })
        })
    }

    delData = (i) => {
        let data = Object.assign([], this.state.couponList)
        data.splice(i, 1)
        this.setState({
            couponList: data
        })
    }


    onReachBottom = () => {
        if(this.state.couponList.length === (this.state.page * 10)) {
            setTimeout(() => {
                let pagenum = this.state.page + 1
                this.setState({
                    page: pagenum
                },() => {
                    this.getData()
                })
            }, 1000)
        }
    }


    checkType = (val) => {
        this.setState({
            type: val,
            page: 1
        },() => {
            this.getData()
        })
    }

    delCon = (val) => {
        this.setState({
            delNum: val
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const { couponList, type, delNum } = this.state
        return <View className='view'>
            <Nav 
                type={type} 
                check={(val) => this.checkType(val)}
            />

            {
                couponList.length > 0 ? 
                <View
                    scroll-y
                    className='coupon-item'
                >
                    {
                        couponList.map((item, i) => (
                            <CouponItem 
                                key={i} 
                                data={item} 
                                type={type} 
                                getdata={this.delData}
                                delnum={delNum}
                                delcon={this.delCon}
                                num={i}
                            />
                        ))
                    }
                </View> :
                <NoList />
            }


            <View className='bot-button'>
                <View className='btn btn-left'>领取优惠券</View>
                <View className='btn'>使用说明</View>
            </View>
            
        </View>
    }
}
