import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Block } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
    show: any
    showService: any
}
export default class Delivery extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        data: {
            service: []
        }
    }
    state = {}
    config: Config = {}
    componentWillMount() {}
    render() {
        let { data } = this.props
        return (
            <Block>
                <View className='delivery' onClick={this.props.show}>
                    <Text className='name'>送至</Text>
                    <View className='list'>
                        <Text className='address tab'>{data.addr}</Text>
                        <Text className='limit tab'>{data.detail}</Text>
                    </View>
                    <Image
                        src='//timgs-v1.tongtongmall.com/ef40daf1'
                        className='to'
                    />
                </View>

                <View
                    className='service'
                    onClick={() => this.props.showService()}
                >
                    {data.service.map((d) => {
                        return (
                            <View key={d.title} className='tab'>
                                <Image
                                    src='//timgs-v1.tongtongmall.com/505f8b37'
                                    className='img'
                                />
                                {d.title}
                            </View>
                        )
                    })}
                </View>
            </Block>
        )
    }
}
