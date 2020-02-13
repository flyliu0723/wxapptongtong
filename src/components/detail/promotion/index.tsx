import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
    onShow: any
}
export default class Promotion extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        data: '',
        onShow: () => {}
    }
    state: {
        length: number
        promotion: any
        otherPromotion: any
    } = {
        length: 0,
        promotion: {},
        otherPromotion: []
    }
    config: Config = {}
    componentWillReceiveProps(nextProps) {
        nextProps = nextProps.data
        if (!nextProps || !nextProps.zp) {
            return
        }
        let length = 0,
            promotion = {},
            otherPromotion: any = []
        if (nextProps.zp.length !== 0) {
            length++
            if (length === 1) {
                promotion = {
                    ...nextProps.zp[0],
                    p: '赠品'
                }
            } else {
                otherPromotion.push('赠品')
            }
        }
        if (nextProps.mjz.length !== 0) {
            length++
            if (length === 1) {
                promotion = {
                    ...nextProps.mjz[0],
                    p: ['满减', '满赠', '满减/赠'][
                        Number(nextProps.mjz[0].type)
                    ]
                }
                if (nextProps.mjz.length > 1) {
                    nextProps.mjz.forEach((d, i) => {
                        if (i !== 0) {
                            otherPromotion.push(
                                ['满减', '满赠', '满减/赠'][Number(d.type)]
                            )
                        }
                    })
                }
            } else {
                nextProps.mjz.forEach((d, i) => {
                    otherPromotion.push(
                        ['满减', '满赠', '满减/赠'][Number(d.type)]
                    )
                })
            }
        }
        if (nextProps.tc.length !== 0) {
            length++
            if (length === 1) {
                promotion = {
                    ...nextProps.tc[0],
                    p: '套餐'
                }
            } else {
                otherPromotion.push('套餐')
            }
        }
        if (nextProps.jg.length !== 0) {
            length++
            if (length === 1) {
                promotion = {
                    ...nextProps.jg[0],
                    p: '加购'
                }
            } else {
                otherPromotion.push('加购')
            }
        }
        if (nextProps.nyrxg.entryid !== '') {
            length++
            if (length === 1) {
                promotion = {
                    ...nextProps.nyrxg,
                    p: 'N元任享'
                }
            } else {
                otherPromotion.push('N元任享')
            }
        }
        this.setState({
            length,
            promotion,
            otherPromotion
        })
    }
    render() {
        let { data } = this.props
        if (
            !data ||
            data === '' ||
            data.zp.length === 0 ||
            data.mjz.length === 0 ||
            data.tc.length === 0 ||
            data.jg.length === 0 ||
            data.nyrxg.entryid === ''
        ) {
            return ''
        }
        let { length, promotion, otherPromotion } = this.state
        if (!promotion.p) return
        return (
            <View className='promotion' onClick={this.props.onShow}>
                <Text className='name'>促销</Text>
                <View className='list'>
                    <View className='tab'>
                        <Button className='pro-tip'>{promotion.p}</Button>
                        {promotion.name}
                    </View>
                    {length > 1 ? (
                        <View className='more tab'>
                            {otherPromotion.map((d) => {
                                return (
                                    <Button className='pro-tip' key={d}>
                                        {d}
                                    </Button>
                                )
                            })}
                        </View>
                    ) : (
                        ''
                    )}
                </View>
                <Image
                    src='//timgs-v1.tongtongmall.com/ef40daf1'
                    className='to'
                />
            </View>
        )
    }
}
