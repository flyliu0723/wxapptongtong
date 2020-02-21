import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}

export default class Page extends Component<Props> {
    state = {}

    // 状态显示
    orderList = (val, type) => {
        switch (val.orderstatus) {
            case '0':
                if(type == 'orderStatus'){
                    return val = '订单审核中'
                }else if(type == 'orderBindContent'){
                    return val = '查看订单'
                }else if(type == 'orderBind'){
                    // 查看订单
                    // this.$router.push({name: 'user-orders-info', query: {orderid: val.ordersettlementid}})
                }
                break
            case '10':
                if(type == 'orderStatus'){
                    return val = '等待付款'
                }else if(type == 'orderBindContent'){
                    return val.predictobj.status == 20 ? val = '支付尾款' : val = '立即支付'
                }else if(type == 'orderBind'){
                    // 立即支付
                    // this.$router.push({name: 'settle', query: {orderid: val.ordersettlementid}})
                }
                break
            case '13':
                if(type == 'orderStatus'){
                    return val = '支付确认中'
                }else if(type == 'orderBindContent'){
                    return val = '查看订单'
                }else if(type == 'orderBind'){
                    // 查看订单
                    // this.$router.push({name: 'user-orders-info', query: {orderid: val.ordersettlementid}})
                }
                break
            case '14':
                if(type == 'orderStatus'){
                    return val = '支付失败'
                }else if(type == 'orderBindContent'){
                    return val = '立即支付'
                }else if(type == 'orderBind'){
                    // 立即支付
                    // this.$router.push({name: 'settle', query: {orderid: val.ordersettlementid}})
                }
                break
            case '20':
                if(type == 'orderStatus'){
                    return val = '已付款'
                }else if(type == 'orderBindContent'){
                    if(val.needidcard == 0){
                        if(val.ispick == 0){
                            val = '提醒发货'
                        }else{
                            val = ''
                        }
                    }else if(val.needidcard == 1){
                        val = '补充身份证'
                    }
                    return val
                }else if(type == 'orderBind'){
                    if(val.needidcard == 0){
                        // 提醒发货
                        // this.remindSend(val)
                    }else if(val.needidcard == 1){
                        // 补充身份证
                        // this.$router.push({name: 'user-account-idcard', query: {orderid: val.ordersettlementid}})
                    }
                }
                break
            case '30':
                if(type == 'orderStatus'){
                    return val = '已付款'
                }else if(type == 'orderBindContent'){
                    if(val.needidcard == 1){
                        val = '补充身份证'
                    }else if(val.needidcard == 0 && val.ispick == '0'){
                        val = '提醒发货'
                    }else if(val.needidcard == 0 && val.ispick == '1'){
                        val = ''
                    }
                    return val
                }else if(type == 'orderBind'){
                    if(val.needidcard == 1){
                        // 补充身份证
                        // this.$router.push({name: 'user-account-idcard', query: {orderid: val.ordersettlementid}})
                    }else if(val.needidcard == 0 && val.ispick == '0'){
                        //提醒发货
                        // this.remindSend(val)
                    }
                }
                break
            case '40':
                if(type == 'orderStatus'){
                    return val = '已发货'
                }else if(type == 'orderBindContent'){
                    return val = '确认收货'
                }else if(type == 'orderBind'){
                    // 确认收货
                    // this.confirmContent = '请确定您已收到商品'
                    // this.order.id = val.ordersettlementid
                    // this.order.type = 'receipt'
                    // this.bnAffirmBounced = true
                }
                break
            case '45':
                if(type == 'orderStatus'){
                    return val = '待提货'
                }else if(type == 'orderBindContent'){
                    return val = '确认收货'
                }else if(type == 'orderBind'){
                    // 确认收货
                    // this.confirmContent = '请确定您已收到商品'
                    // this.order.id = val.ordersettlementid
                    // this.order.type = 'receipt'
                    // this.bnAffirmBounced = true
                }
                break
                // 订单状态50
            case '50':
                if(type == 'orderStatus'){
                    return val = '交易关闭'
                }else if(type == 'orderBindContent'){
                    return val = '删除订单'
                }else if(type == 'orderBind'){
                    // 删除订单
                    // this.confirmContent = '确定要删除订单？'
                    // this.order.id = val.ordersettlementid
                    // this.order.type = 'delete'
                    // this.bnAffirmBounced = true
                }
                break
                // 订单状态60
            case '60':
                if(type == 'orderStatus'){
                    return val = '已完成'
                }else if(type == 'orderBindContent'){
                    var bnEvaluate = false
                    for (var i = 0; i < val.goods.length; i++) {
                        if(val.goods[i].commentstatus == 0){
                            bnEvaluate = true
                        }
                    }
                    if (val.ordertype == 50) {
                        val = ''
                    } else {
                        if(bnEvaluate){
                            val = '评价'
                        }else {
                            val = '再次购买'
                        }
                    }
                    
                    return val
                }else if(type == 'orderBind'){
                    var bnEvaluate = false
                    // 评价或者再次购买
                    for (var i = 0; i < val.goods.length; i++) {
                        if(val.goods[i].commentstatus == 0){
                            bnEvaluate = true
                        }
                    }
                    if(bnEvaluate){
                        // 评价
                        // this.$router.push({name: 'user-orders-evaluate', query: {orderid: val.ordersettlementid, orderidshow: val.orderidshow}})
                    }else {
                        // this.$store.dispatch('user/reBuyOrder', {ordersettlementid: val.ordersettlementid}).then((r)=>{
                        //     if(r){
                        //         // 再次购买
                        //         this.$router.push({name: 'cart', query: {orderid: val.ordersettlementid}})
                        //     }
                        // })

                    }
                }
                break
            }
    }

    // 时间转换
    transformTime = (e) => {
        let time = String(e)
        return (
            time.substring(0, 4) +
            '-' +
            time.substring(4, 6) +
            '-' +
            time.substring(6, 8) +
            ' ' +
            time.substring(8, 10) +
            ':' +
            time.substring(10, 12) +
            ':' +
            time.substring(12, 14)
        )
    }

    //付款文字
    payContent = (val) => {
        if (val == 0 || val == 1 || val == 10 || val == 13 || val == 14) {
            return '应付款'
        } else {
            return '实付款'
        }
    }

    render() {
        const { data } = this.props
        return (
            <View className='goods'>
                <View className='goods_top'>
                    <Text className='time'>
                        {this.transformTime(data.time)}
                    </Text>
                    <Text className='status'>
                        {this.orderList(data, 'orderStatus')}
                    </Text>
                </View>
                <View 
                    className='goods_center'
                    onClick={() => {
                        Taro.navigateTo({
                            url: `/pages/orderinfo/index?orderid=${data.ordersettlementid}`
                        })
                    }}
                >
                    {data.goods.length === 1 ? (
                        <View className='goods_one'>
                            <View className='goods_img'>
                                <Image
                                    className='img'
                                    src={data.goods[0].gpurl}
                                />
                            </View>
                            <View className='goods_msg'>
                                <Text className='name'>{data.goods[0].gn}</Text>
                                <Text className='other'>
                                    &yen;
                                    <Text className='money'>
                                        {data.goods[0].gp}
                                    </Text>
                                    <Text className='num'>
                                        x{data.goods[0].n}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View className='goods_more'>
                            <View className='goods_img'>
                                {data.goods.slice(0, 3).map((k, i) => (
                                    <Image
                                        key={i}
                                        className='img'
                                        src={k.gpurl}
                                    />
                                ))}
                            </View>
                            <View className='goods_msg'>
                                {data.goods.length > 3 && <Text>...</Text>}共
                                {data.goods.length}件商品
                            </View>
                        </View>
                    )}
                </View>
                <View className='goods_bottom'>
                    <Text className='price'>
                        {this.payContent(data.orderstatus)}：
                        <Text className='price_num'>&yen;{data.price}</Text>
                    </Text>
                    {
                        this.orderList(data,'orderBindContent') !== '' 
                        && 
                        <Button className='goods_btn'>{this.orderList(data,'orderBindContent')}</Button>
                    }           
                </View>
            </View>
        )
    }
}
