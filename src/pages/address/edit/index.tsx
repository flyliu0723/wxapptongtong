import Taro, { Component, Config, getCurrentPages } from '@tarojs/taro'
import { View, Text, Image, Input, Button, Form, Picker } from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'

export default class Page extends Component {
    state = {
        name: '',
        phone: '',
        provid: '',
        cityid: '',
        countyid: '',
        addr: '',
        idcard: '',
        tipsShow: false,
        tipsText: '',
        selector: []
    }

    config: Config = {
        navigationBarTitleText: '加载中...'
    }

    componentDidMount() {
        Taro.setNavigationBarTitle({
            title: this.$router.params.id ? '编辑收货地址' : '新建收货地址'
        })
        if(this.$router.params.id) {
            http.get('user/my-receipt-ads', {
                addrid: this.$router.params.id
            }).then(d =>{
                let data = d.data.list[0]
                this.setState({
                    name: data.name,
                    phone: data.phone,
                    addr: data.addr,
                    idcard: data.idcard,
                    selector: [data.provname, data.cityname, data.countyname],
                    provid: data.provid,
                    cityid: data.cityid,
                    countyid: data.countyid
                })
            })
        }
    }

    onCityChange = e => {
        this.setState({
            selector: e.detail.value,
            provid: e.detail.code[0],
            cityid: e.detail.code[1],
            countyid: e.detail.code[2],
        })
    }

    submit = () => {
        if (!this.state.name) {
            this.setState({
                tipsShow: true,
                tipsText: '请输入姓名'
            })
        } else if (!this.state.phone) {
            this.setState({
                tipsShow: true,
                tipsText: '请输入手机号'
            })
        } else if (this.state.phone && !(/^[1]([3-9])[0-9]{9}$/.test(this.state.phone))) {
            this.setState({
                tipsShow: true,
                tipsText: '请输入正确的手机号'
            })
        } else if (
            !this.state.provid ||
            !this.state.cityid ||
            !this.state.countyid
        ) {
            this.setState({
                tipsShow: true,
                tipsText: '请选择省市区'
            })
        } else if (!this.state.addr) {
            this.setState({
                tipsShow: true,
                tipsText: '请输入详细地址'
            })
        } else if (this.state.idcard && !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(this.state.idcard)) {
            this.setState({
                tipsShow: true,
                tipsText: '请输入正确身份证号'
            })
        } else {
            let data = {
                name: this.state.name,
                phone: this.state.phone,
                provid: this.state.provid,
                cityid: this.state.cityid,
                countyid: this.state.countyid,
                addr: this.state.addr,
                idcard: this.state.idcard,
                isdefault: 1,
                addrid: this.$router.params.id ? this.$router.params.id : ''
            }

            let url

            if(this.$router.params.id) {
                url = 'user/receipt-ads-add'
            } else {
                delete data.addrid
                url = 'user/receipt-ads-edit'
            }

            http.post(url, data).then(d => {
                let pages = getCurrentPages()
                if (pages.length >1) {
                    let prevPage = pages[pages.length- 2]
                    prevPage.onShow()
                }
                Taro.navigateBack()
            })
        }
    }

    render() {
        const { tipsShow ,tipsText, name, phone, addr, idcard, selector } = this.state
        return (
            <View className='view'>
                <Form className='address'>
                    <View className='tab'>
                        <Text className='name'>收 货 人 ： </Text>
                        <Input
                            className='input'
                            placeholder='收货人姓名'
                            value={name}
                            onInput={(e) => {
                                this.setState({
                                    name: e.detail.value
                                })
                            }}
                        />
                    </View>
                    <View className='tab'>
                        <Text className='name'>手 机 号 ： </Text>
                        <Input
                            className='input'
                            placeholder='请输入您的手机号'
                            value={phone}
                            onInput={(e) => {
                                this.setState({
                                    phone: e.detail.value
                                })
                            }}
                        />
                    </View>
                    <View className='tab'>
                        <Text className='name'>所在地区： </Text>
                        <Picker className='picker' mode='region' onChange={this.onCityChange} value={selector}>
                            <View className='check-city'>
                                {selector[0]}{selector[1]}{selector[2]}
                                <Image
                                    className='to'
                                    src='//m.tongtongmall.com/style/img/gads1.png'
                                />
                            </View>
                        </Picker>
                        
                    </View>
                    <View className='tab'>
                        <Text className='name'>详细地址： </Text>
                        <Input
                            className='input'
                            placeholder='收货人详细地址'
                            value={addr}
                            onInput={(e) => {
                                this.setState({
                                    addr: e.detail.value
                                })
                            }}
                        />
                    </View>
                    <View className='tab'>
                        <Text className='name'>身份证号： </Text>
                        <Input
                            className='input'
                            placeholder='您的身份证号码（选填）'
                            value={idcard}
                            onInput={(e) => {
                                this.setState({
                                    idcard: e.detail.value
                                })
                            }}
                        />
                    </View>
                    <View className='tips'>
                        海关清关需收货人姓名与身份证号一致并准确无误
                    </View>
                </Form>

                {tipsShow && <Text className='error'>{tipsText}</Text>}
                

                <Button className='submit' onClick={() => this.submit()}>
                    保存
                </Button>
            </View>
        )
    }
}
