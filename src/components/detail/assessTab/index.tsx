import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}
export default class Assess extends Component<Props> {
    constructor(props) {
        super(props)
    }
    config: Config = {}
    transformTime(data) {
        var time = String(data)
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
    render() {
        let { data } = this.props
        let startLength = new Array(Number(data.clevel))
        return (
            <View className='assess' key={data.cid}>
                <View className='message'>
                    <Image
                        className='header'
                        src={
                            data.cimg || '//timgs-v1.tongtongmall.com/80c81d91'
                        }
                        mode='widthFix'
                    />
                    <View className='user'>
                        <Text>{data.cuser}</Text>
                        <Text>{this.transformTime(data.ct)}</Text>
                    </View>
                    <View className='star'>
                        {startLength.map(() => {
                            return (
                                <Image
                                    src='//timgs-v1.tongtongmall.com/f1e5febb'
                                    mode='widthFix'
                                />
                            )
                        })}
                    </View>
                </View>
                <View className='content'>{data.cc}</View>
                <View className='time'>
                    购买时间：{this.transformTime(data.buytime)}
                </View>
            </View>
        )
    }
}
