import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Input, Button, Form, Picker } from '@tarojs/components'
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
        navigationBarTitleText: '编辑收货地址'
    }

    onTimeChange = e => {
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
        } else if (!/1{1}\d{10}/.test(this.state.phone)) {
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
        } else {
            let data = {
                name: this.state.name,
                phone: this.state.phone,
                provid: this.state.provid,
                cityid: this.state.cityid,
                countyid: this.state.countyid,
                addr: this.state.addr,
                idcard: this.state.idcard,
                isdefault: 1
            }

            console.log(data)
        }
    }

    render() {
        const { tipsShow ,tipsText } = this.state
        return (
            <View className='view'>
                <Form className='address'>
                    <View className='tab'>
                        <Text className='name'>收 货 人 ： </Text>
                        <Input
                            className='input'
                            placeholder='收货人姓名'
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
                            onInput={(e) => {
                                this.setState({
                                    phone: e.detail.value
                                })
                            }}
                        />
                    </View>
                    <View className='tab'>
                        <Text className='name'>所在地区： </Text>
                        <Picker className='picker' mode='region' onChange={this.onTimeChange} value={this.state.selector}>
                            <View className='check-city'>
                                {this.state.selector[0]}{this.state.selector[1]}{this.state.selector[2]}
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
