import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'


export default class Page extends Component {
    state = {
        type: this.$router.params.type || '1',
        data: {
            cvalue: '',
            cnote: '',
            cname: '', 
            coupontype: '',
            timelimitstart: '',
            timelimitend: '',
            range: '',
            ps: '',
            couponid: ''
        },
        canUse: false
    }

    config: Config = {
        navigationBarTitleText: '优惠券详情'
    }
    

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

    uglyTimeCompare = (ugly) => {
        let y = ugly.substr(0, 4)
        let m = ugly.substr(4, 2) - 1
        let d = ugly.substr(6, 2)
        let h = ugly.substr(8, 2)
        let i = ugly.substr(10, 2)
        let s = ugly.substr(12, 2)
        let uglyTime = (new Date(y, m, d, h, i, s)).getTime()
        let now = Date.now()
        let type = this.state.type
        return ((uglyTime > now) && type === '1')
    }


    transformDateWithDot = (val) => {
        let time = new String(val)
        return time.substring(0, 4) + '.' + time.substring(4, 6) + '.' + time.substring(6, 8)
    }

    componentDidMount() {
        http.get(`user/coupon-info?couponid=${this.$router.params.id}`).then(d => {
            this.setState({
                data: d.data,
                canUse: this.uglyTimeCompare(d.data.timelimitend)
            })
        })
    }


    render() {
        const { data, canUse, type } = this.state
        return <View className={canUse ? 'view' : 'view gray_bg'}>
            <View className='message'>
                <View className='price'>
                    <View className='num'>
                        <Text className='icon'>&yen;</Text>{data.cvalue}
                    </View>
                    <View className='note'>
                        {data.cnote}
                    </View>
                </View>
                <View className='detail'>
                    <View className='name'>{data.cname}</View>
                    <View className='type'><Text className='type-con'>{this.couponType(data.coupontype)}</Text></View>
                    {
                        (type === '2' || type === '3') &&
                        <Image className='used' src={type === '2' ? '//timgs-v1.tongtongmall.com/d51a609f' : '//timgs-v1.tongtongmall.com/5e3f57eb'} />
                    }
                    {
                        canUse && 
                        <Button 
                            className='btn'
                            onClick={() => {
                                Taro.navigateTo({
                                    url: `/pages/list/index?couponid=${data.couponid}`
                                })
                            }}
                        >
                            立即使用
                        </Button>
                    }
                    
                </View>
            </View>
            <View className='use-detail'>
                <View className='title'>使用详情</View>
                <View className='use'>
                    <Image className='img' src='//timgs-v1.tongtongmall.com/b847e72b' />
                    <View className='text'>
                        <View className='headline'>有效期</View>
                        <View className='con'>{this.transformDateWithDot(data.timelimitstart)}   -   {this.transformDateWithDot(data.timelimitend)}</View>
                    </View>
                </View>
                {
                    data.ps &&
                    <View className='use'>
                        <Image className='img' src='//timgs-v1.tongtongmall.com/de3b672a' />
                        <View className='text'>
                            <View className='headline'>使用说明</View>
                            <View className='con'>{data.ps.replace(/(\r\n|\r|\n)/ig, '<br/>')}</View>
                        </View>
                    </View>
                }
                
                <View className='use'>
                    <Image className='img' src='//timgs-v1.tongtongmall.com/920d4b83' />
                    <View className='text'>
                        <View className='headline'>使用范围</View>
                        <View className='con'>{data.range}</View>
                    </View>
                </View>
            </View>
        </View>
    }
}
