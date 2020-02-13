import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Label, Image, ScrollView } from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'
import Header from '../../../components/detail/header'
import Bottom from '../../../components/detail/bottom'

export default class Page extends Component {
    state = {
        imgs: [],
        before: [],
        after: []
    }
    config: Config = {
        navigationBarTitleText: '商品详情'
    }
    componentWillMount() {
        http.get('product/prodetail-img', {
            goodsid: '7305a717-72b4-4dca-8311-c016aec17282'
        }).then((d) => {
            this.setState({
                imgs: d.data
            })
        })
        http.get('product/prodetail-img-template', {
            goodsid: '7305a717-72b4-4dca-8311-c016aec17282',
            postion: 10,
            platform: 2
        }).then((d) => {
            this.setState({
                before: d.data.imgs
            })
        })
        http.get('product/prodetail-img-template', {
            goodsid: '7305a717-72b4-4dca-8311-c016aec17282',
            postion: 20,
            platform: 2
        }).then((d) => {
            this.setState({
                after: d.data.imgs
            })
        })
    }
    render() {
        let { before, imgs, after } = this.state
        return (
            <View className='view'>
                <Header inTab='detail' />

                <ScrollView className='imgs'>
                    {before.map((d: any) => {
                        return <Image mode='widthFix' key={d.url} src={d.url} />
                    })}
                    {imgs.map((d: any) => {
                        return <Image mode='widthFix' key={d.url} src={d.url} />
                    })}
                    {after.map((d: any) => {
                        return <Image mode='widthFix' key={d.url} src={d.url} />
                    })}
                </ScrollView>
                <Bottom />
            </View>
        )
    }
}
