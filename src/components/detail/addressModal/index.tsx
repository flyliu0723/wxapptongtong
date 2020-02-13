import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

interface Props {
    hide: any
    data: any
}
export default class Promotion extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        data: ''
    }
    state: {
        promotion: any
    } = {
        promotion: []
    }
    config: Config = {}
    render() {
        let { data } = this.props
        return (
            <View className='promotion'>
                <View className='content'>
                    <View className='title'>
                        配送至
                        <Image
                            src='//timgs-v1.tongtongmall.com/30cb13d6'
                            className='close'
                            onClick={this.props.hide}
                        />
                    </View>
                    <View className='list'>
                        {data.map((d) => {
                            return (
                                <View
                                    className={
                                        d.isdefault === '1'
                                            ? 'tab active'
                                            : 'tab'
                                    }
                                >
                                    <Image
                                        src='//timgs-v1.tongtongmall.com/ae26cad0514148cbb915b2739a62e958'
                                        className='address-logo'
                                    />
                                    {d.provname +
                                        d.cityname +
                                        d.countyname +
                                        d.addr}
                                </View>
                            )
                        })}
                    </View>
                    <View className='actions'>选择其他地址</View>
                </View>
            </View>
        )
    }
}
