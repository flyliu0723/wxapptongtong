import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'

interface Props {
    data: any
    getdata: any
}

export default class Page extends Component<Props> {
    state = {}

    // 设为默认
    setDefault = () => {
        http.post('user/receipt-ads-default', {
            addrid: this.props.data.addrid
        }).then((d) => {
            this.props.getdata()
        })
    }

    // 删除地址
    delAddr = () => {
        if (this.props.data.isdefault !== '1') {
            http.post('user/receipt-ads-delete', {
                addrid: this.props.data.addrid
            }).then((d) => {
                this.props.getdata()
            })
        } else {
            Taro.showToast({
                title: '不能删除默认地址',
                icon: 'none'
            })
        }
    }
    render() {
        const { data } = this.props
        return (
            <View className='addr'>
                <View className='user-msg'>
                    <Text>{data.name}</Text>
                    <Text className='phone'>
                        {data.phone.replace(data.phone.substring(3, 7), '****')}
                    </Text>
                </View>
                <View className='address'>
                    {data.provname + data.cityname + data.countyname}{' '}
                    {data.addr}
                </View>
                <View className='operation'>
                    <View className='default' onClick={() => this.setDefault()}>
                        <Text
                            className={
                                data.isdefault === '1'
                                    ? 'circle select'
                                    : 'circle'
                            }
                        />
                        <Text className='addtxt'>设为默认地址</Text>
                    </View>

                    <View className='handle'>
                        <View 
                            className='edit'
                            onClick={() => {
                                Taro.navigateTo({
                                    url: `/pages/address/edit/index?id=${data.addrid}`
                                })
                            }}
                        >
                            <Image
                                className='img'
                                src='//timgs-v1.tongtongmall.com/6d2e6f51'
                            />
                            编辑
                        </View>
                        <View className='del' onClick={() => this.delAddr()}>
                            <Image
                                className='img'
                                src='//timgs-v1.tongtongmall.com/07cfea70'
                            />
                            删除
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
