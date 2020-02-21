import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Textarea, Image, Input } from '@tarojs/components'
import http from '../../../utils/http'
import auth from '../../../utils/auth'
import './index.scss'

export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '选择优惠券',
        backgroundColor: '#f5f5f5'
    }
    state: {
        inTab: number
        can: any
        nocan: any
    } = {
        inTab: 0,
        can: [],
        nocan: []
    }
    componentWillMount() {
        let can = this.state.can,
            nocan = this.state.nocan,
            type = this.$router.params.type
        Taro.getStorage({ key: 'couponList' }).then((d) => {
            d.data.forEach((c) => {
                if (c.iscan === '0' && c.coupontype === type) {
                    nocan.push(c)
                } else if (c.coupontype === type) {
                    can.push(c)
                }
            })
            this.setState({
                can,
                nocan
            })
        })
    }
    componentWillUnmount() {
        Taro.removeStorage({ key: 'couponList' })
    }
    renderNoCoupon() {
        return (
            <View className='no'>
                <Image
                    className='no-img'
                    src='//timgs-v1.tongtongmall.com/fcd9a5e0'
                />
                <View>暂无优惠券</View>
            </View>
        )
    }
    renderList(list, type) {
        return list.map((l) => {
            return (
                <View className='coupon' key={l.couponid} onClick={() => {
                    if(type === 0) return
                    Taro.setStorage({
                        key: 'useCoupon',
                        data: {
                            type,
                            id: l.couponid
                        }
                    })
                    Taro.navigateBack()
                }}>
                    <View className='value'>
                        <View className={type ===  1 ? 'price' : 'price grey'}>
                            ￥<Text className='num'>{l.cvalue}</Text>
                        </View>
                        <View className='limit'>{l.cnote}</View>
                    </View>
                    <View className='desc'>
                        <View className='name'>
                            <Text className={type ===  1 ? 'tip' : 'tip grey'}>
                                {l.coupontype === '0' ? '商品券' : '运费券'}
                            </Text>
                            <Text className={type ===  1 ? 'coupon-name' : 'coupon-name grey-coupon'}>{l.cname}</Text>
                        </View>
                        <View className='time'>
                            {this.formatTime(l.timelimitstart) +
                                '-' +
                                this.formatTime(l.timelimitend)}
                        </View>
                    </View>
                </View>
            )
        })
    }
    formatTime(val) {
        var time = new String(val)
        return (
            time.substring(0, 4) +
            '.' +
            time.substring(4, 6) +
            '.' +
            time.substring(6, 8)
        )
    }
    render() {
        return (
            <View className='view'>
                <View className='option'>
                    <View
                        className={
                            this.state.inTab === 0 ? 'active tab' : 'tab'
                        }
                        onClick={() => this.setState({ inTab: 0 })}
                    >
                        可用({this.state.can.length})
                    </View>
                    <View
                        className={
                            this.state.inTab === 1 ? 'active tab' : 'tab'
                        }
                        onClick={() => this.setState({ inTab: 1 })}
                    >
                        不可用({this.state.nocan.length})
                    </View>
                </View>
                <View className='list'>
                    {this.state.inTab === 0
                        ? this.state.can.length === 0
                            ? this.renderNoCoupon()
                            : this.renderList(this.state.can, 1)
                        : this.state.nocan.length === 0
                        ? this.renderNoCoupon()
                        : this.renderList(this.state.nocan, 0)}
                </View>
                {this.state.inTab === 0 ? (
                    <View className='btn' onClick={() => Taro.navigateBack()}>不使用优惠券</View>
                ) : (
                    ''
                )}
            </View>
        )
    }
}
