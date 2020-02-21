import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Textarea } from '@tarojs/components'
import http from '../../utils/http'
import './index.scss'

export default class Page extends Component {
    state: {
        other: string,
        reasons: any
    } = {
        other: '',
        reasons: [
            {
                name: '我买错了',
                value: 0,
                checked: false
            },{
                name: '我看到有更便宜的',
                value: 1,
                checked: false
            },{
                name: '重复下单',
                value: 2,
                checked: false
            },{
                name: '无法支付',
                value: 3,
                checked: false
            },{
                name: '收货地址错误',
                value: 4,
                checked: false
            },{
                name: '我不想要了',
                value: 5,
                checked: false
            },{
                name: '其他',
                value: 6,
                checked: false
            },
        ]
    }

    config: Config = {
        navigationBarTitleText: '申请退款'
    }

    componentDidMount() {
       
    }
    renderCicle(type) {
        return (
            <Image
                src={
                    type
                        ? '//timgs-v1.tongtongmall.com/1a7dcb69'
                        : '//timgs-v1.tongtongmall.com/73564d16'
                }
                className='choice-btn'
            />
        )
    }
    selected(id) {  
        let {reasons} = this.state
        reasons = reasons.map(r => {
            if(r.value === id) {
                return {
                    ...r,
                    checked: !r.checked
                }
            }else {
                return r
            }
        })
        this.setState({reasons})
    }
    render() {
        return (
            <View className='refund'>
                <View className='select-reason'>请选择退款原因</View>
                {
                    this.state.reasons.map(d => {
                        return <View className='option' key={d.value}>
                            <View className='reason'>{d.name}</View>
                            <View className='select' onClick={() => this.selected(d.value)}>{this.renderCicle(d.checked)}</View>
                        </View>
                    })
                }
                <View className='other'>
                    <Textarea
                        value={this.state.other}
                        maxlength={200}
                        onInput={(e) => {
                            this.setState({
                                other: e.detail.value
                            })
                            return e.detail.value
                        }}
                        className='other-reason'
                        placeholder='请填写取消原因'
                    >
                    </Textarea>
                </View>
                <View className='action'>
                    <View className='btn cancel'>取消</View>
                    <View className='btn ok'>确定</View>
                </View>
            </View>
        )
    }
}
