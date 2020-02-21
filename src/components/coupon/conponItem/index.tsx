import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'

interface Props {
    data: any
    type: String
    getdata: any
    delnum: String
    delcon: any
    num: Number
}

export default class Page extends Component<Props> {
    
    state = {
        startX: 0,
        startY: 0,
        delShow: false
    }

    // 优惠券类型
    couponType = (val) => {
        switch(val){
        case '0':
            return '商品券'
            break
        case '1':
            return '门店券'
            break
        case '2':
            return '运费券'
            break
        }
    }

    // 时间显示
    timeShow = (val) => {
        let time = new String(val)
        return time.substring(0, 4) + '.' + time.substring(4, 6) + '.' + time.substring(6, 8)
    }

    angle(start, end) {
        let _X = end.X - start.X
        let _Y = end.Y - start.Y
        
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
    }

    touchstart = (e) => {
        this.setState({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
        })
    }

    touchmove = (e) => {
        let that = this

        let startX = that.state.startX
        let startY = that.state.startY
        let touchMoveX = e.changedTouches[0].clientX
        let touchMoveY = e.changedTouches[0].clientY

        let angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY })
        if (Math.abs(angle) > 30) return
        if(touchMoveX - startX > 50 && Math.abs(touchMoveY - startY) < 50) {
            this.setState({delShow: false})
            this.props.delcon('')
        }else if(touchMoveX - startX < -50 && Math.abs(touchMoveY - startY) < 50) {
            this.setState({delShow: true})
            this.props.delcon(this.props.data.usercouponid)
        }
    }

    delCoupon = () => {
        http.post('user/del-coupon', {
            couponids: [this.props.data.usercouponid],
            type: 1
        }).then(d => {
            this.props.getdata(this.props.num)
            this.setState({delShow: false})
            this.props.delcon('')
        })
    }

    render() {
        const { data, type, delnum } = this.props
        const { delShow } = this.state
        return (
            <View className='is-con'>
                <View 
                    className={(delShow && delnum === data.usercouponid) ? 'del del-red' : 'del'}
                    onClick={() => this.delCoupon()}
                >
                    删除
                </View>
                <View 
                    className={`item-con ${type === '1' && 'item-red'} ${(delShow && delnum === data.usercouponid) && 'del-show'}`}
                    onTouchStart={(e) => this.touchstart(e)}
                    onTouchEnd={(e) => this.touchmove(e)}
                >
                    <View className='contop'>
                        <View className='contop-left'>
                            <View className='price'>
                                &yen;<Text className='money'>{data.cvalue}</Text>
                            </View>
                            <Text className='cill'>{data.cnote}</Text>
                        </View>
                        <View className='contop-right'>
                            <View className='name'>
                                <Text className='type-text'>{this.couponType(data.coupontype)}</Text>
                                <Text className='name-text'>{data.cname}</Text>
                            </View>
                            <View className='time'>
                                {this.timeShow(data.timelimitstart)} - {this.timeShow(data.timelimitend)}
                            </View>
                            {
                                type === '1' &&
                                <View 
                                    className='use-btn'
                                    onClick={() => {
                                        Taro.navigateTo({
                                            url: `/pages/list/index?couponid=${data.couponid}`
                                        })
                                    }}
                                >
                                    <Button className='btn'>立即使用</Button>
                                </View>
                            }
                            
                            {type === '2' && <Image className='con-img' src='//timgs-v1.tongtongmall.com/60c63524' />}
                            {type === '3' && <Image className='con-img' src='//timgs-v1.tongtongmall.com/7064f754' />}
                        </View>
                    </View>

                    <View 
                        className='conbottom'
                        onClick={() => {
                            Taro.navigateTo({
                                url: `/pages/coupon/info/index?id=${data.couponid}&code=${data.code}&type=${type}`
                            })
                        }}
                    >
                        查看详情
                        <Image
                            className='more'
                            src='//m.tongtongmall.com/style/img/gads1.png'
                        />
                    </View>
                </View>
            </View>
            
        )
    }
}
