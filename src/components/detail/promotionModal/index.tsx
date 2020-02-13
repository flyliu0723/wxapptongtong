import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
    hide: any
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
    componentDidMount() {
        this.prepareData(this.props.data)
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps || !nextProps.data.zp) {
            return
        }
        this.prepareData(nextProps.data)
    }
    prepareData(nextProps) {
        let promotion: any = []
        if (nextProps.zp.length !== 0) {
            promotion = promotion.concat(
                nextProps.zp.map((d) => {
                    return {
                        ...d,
                        p: '赠品'
                    }
                })
            )
        }
        if (nextProps.mjz.length !== 0) {
            promotion = promotion.concat(
                nextProps.mjz.map((d) => {
                    return {
                        ...d,
                        p: ['满减', '满赠', '满减/赠'][Number(d.type)]
                    }
                })
            )
        }
        if (nextProps.tc.length !== 0) {
            promotion = promotion.concat(
                nextProps.tc.map((d) => {
                    return {
                        ...d,
                        p: '套餐'
                    }
                })
            )
        }
        if (nextProps.jg.length !== 0) {
            promotion = promotion.concat(
                nextProps.jg.map((d) => {
                    return {
                        ...d,
                        p: '加购'
                    }
                })
            )
        }
        if (nextProps.nyrxg.entryid !== '') {
            promotion.push({
                ...nextProps.nyrxg,
                p: 'N元任享',
                name: nextProps.nyrxg.title,
                id: nextProps.nyrxg.entryid
            })
        }
        this.setState({
            promotion
        })
    }
    render() {
        return (
            <View className='promotion'>
                <View className='content'>
                    <View className='title'>
                        促销
                        <Image
                            src='//timgs-v1.tongtongmall.com/30cb13d6'
                            className='close'
                            onClick={() => this.props.hide()}
                        />
                    </View>
                    <View className='list'>
                        {this.state.promotion.map((d) => {
                            return (
                                <View className='tab' key={d.id}>
                                    <Text className='tip'>{d.p}</Text>
                                    <Text className='name'>{d.name}</Text>
                                    <Image
                                        src='//timgs-v1.tongtongmall.com/ef40daf1'
                                        className='to'
                                    />
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
