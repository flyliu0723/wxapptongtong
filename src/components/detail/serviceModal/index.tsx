import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

interface Props {
    hide?: any
    data: any
}
export default class Promotion extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        data: ''
    }
    state: {} = {}
    config: Config = {}

    render() {
        let { data } = this.props
        return (
            <View className='service'>
                <View className='content'>
                    <View className='title'>
                        服务说明
                        <Image
                            src='//timgs-v1.tongtongmall.com/30cb13d6'
                            className='close'
                            onClick={() => this.props.hide()}
                        />
                    </View>
                    <View className='list'>
                        {data.map((d) => {
                            return (
                                <View className='tab' key={d.title}>
                                    <Image
                                        src={d.icon}
                                        className='service-logo'
                                    />
                                    <View className='name'>
                                        <View>{d.title}</View>
                                        <View className='desc'>{d.desc}</View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View className='actions' onClick={() => this.props.hide()}>
                        确定
                    </View>
                </View>
            </View>
        )
    }
}
