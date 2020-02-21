// 支付页推荐商品

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}

export default class Page extends Component<Props> {
    state = {
        countDownShow: false,
        countDownTimeContent: '',
        countDownTime: 0,
        TimeCon: {
            h: '',
            m: '',
            s: ''
        },
        buttonShow: true, // 是否显示按钮
        leftShow: false, // 是否显示左按钮
        rightShow: false, // 是否显示右按钮
        leftBtn: '', // 左按钮内容
        rightBtn: '' // 右按钮内容
    }


    // 计时器
    countDown = () => {
        let that = this
        let time = that.state.countDownTime
        let t = setInterval(() => {
            time--
            this.payRemainingTime(time)
            if(that.state.countDownTime === 0){
                clearInterval(t)
            }
        }, 1000)
    }

    payRemainingTime = (val) => {
        let time:any = {
            h: 0,
            m: 0,
            s: 0
        }
        // 时
        time.h = parseInt(String(val / 3600))
        // 分
        time.m = parseInt(String((val % 3600) / 60))
        // 秒
        time.s = parseInt(String((val % 3600) % 60))
        // 时分秒为个位数的时候，加上'0'(以显示成00:00:00的形式)
        if(time.h < 10 && time.h >= 0){
            time.h = '0' + time.h
        }
        if(time.m < 10 && time.m >= 0){
            time.m = '0' + time.m
        }
        if(time.s < 10 && time.s >= 0){
            time.s = '0' + time.s
        }
        this.setState({
            TimeCon: time
        })
    }


    payResidueTime () {
        let time = this.state.TimeCon
        if(Number(time.h) > 24){
            return Math.floor(Number(time.h) / 24) + '天后'
        }else{
            return time.h + ':' + time.m + ':' + time.s
        }
    }

    componentDidMount() {
        this.orderStateDispose(this.props.data)
        // 是否显示倒计时(待付款)
        if(this.props.data.payexpire != ''){
            this.setState({
                countDownTime: Number(this.props.data.payexpire)
            }, () => {
                this.countDown()
            }) 
        }
        // 是否显示倒计时(确认收货)
        if(this.props.data.confirmexpire != ''){
            this.setState({
                countDownTime: Number(this.props.data.confirmexpire)
            }, () => {
                this.countDown()
            }) 
        }
    }


    orderStateDispose = (val, type?) => {
        switch (val.orderstatus){
        case '10':
            if(!type) {
                if(val.ordertype === '20' && val.predictobj.status === '20'){
                    this.bottomButtonOperate(true, true, '取消订单', '支付尾款')
                    this.setState({
                        countDownShow: true,
                        countDownTimeContent: '尾款支付剩余时间：',
                        buttonShow: true
                    })
    
                }else{
                    this.bottomButtonOperate(true, true, '取消订单', '立即支付')
                    this.setState({
                        countDownShow: true,
                        countDownTimeContent: '付款剩余时间：',
                        buttonShow: true
                    })
                }
            } else {
                type === 'left' ? console.log(9) : console.log(234)
            }
            
            break
        }
    }


    bottomButtonOperate(bn1, bn2, content1, content2){
        this.setState({
            leftShow: bn1, 
            rightShow: bn2, 
            leftBtn: content1, 
            rightBtn: content2
        })
    }

    render() {
        const { data } = this.props
        const { countDownShow, countDownTimeContent, leftShow, rightShow, leftBtn, rightBtn } = this.state
        return (
            <View>
                {
                    this.state.buttonShow && 
                    <View className='bottom'>
                        {
                            countDownShow &&
                            <View className='timeshow'>
                                <Text>{countDownTimeContent}</Text>
                                <Text className='red'>{this.payResidueTime()}</Text>
                            </View>
                        }
                        <View className='oprate'>
                            {
                                leftShow && 
                                <Text 
                                    className='left-btn btn'
                                    onClick={() => this.orderStateDispose(data, 'left')}
                                >
                                    { leftBtn }
                                </Text>
                            }
                            {
                                rightShow && 
                                <Text 
                                    className='right-btn btn'
                                    onClick={() => this.orderStateDispose(data, 'right')}
                                >
                                    { rightBtn }
                                </Text>
                            }
                        </View>
                    </View>
                }
            </View>
        )
    }
}
