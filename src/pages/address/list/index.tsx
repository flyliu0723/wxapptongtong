import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'

import Addr from '../../../components/address/list/index'

export default class Page extends Component {
    state = {
        addressList: []
    }


    config: Config = {
        navigationBarTitleText: '收货地址'
    }

    componentDidShow() {
        this.getData()
    }

    getData = () => {
        http.get('user/my-receipt-ads').then((d) => {
            this.setState({
                addressList: d.data.list
            })
        })
    }

    render() {
        const { addressList } = this.state
        return (
            <View className='view'>
                {addressList.length > 0 ? (
                    <View className='addrlist'>
                        {addressList.map((item, i) => (
                            <Addr data={item} key={i} getdata={this.getData} />
                        ))}

                        <View
                            className='add-new'
                            onClick={() => {
                                Taro.navigateTo({
                                    url: '/pages/address/edit/index'
                                })
                            }}
                        >
                            新建收货地址
                        </View>
                    </View>
                ) : (
                    <View className='no-list'>
                        <Image
                            className='img'
                            src='//timgs-v1.tongtongmall.com/ca1f066b'
                        />
                        <View
                            className='add-one'
                            onClick={() => {
                                Taro.navigateTo({
                                    url: '/pages/address/edit/index'
                                })
                            }}
                        >
                            添加新地址
                        </View>
                    </View>
                )}
            </View>
        )
    }
}
