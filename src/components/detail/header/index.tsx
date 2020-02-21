import Taro, { Component, Config } from '@tarojs/taro'
import { View, Label } from '@tarojs/components'
import './index.scss'

interface Props {
    inTab: string,
    goodsid: string
    goodstradestate: string
}

export default class Header extends Component<Props> {
    config: Config = {}
    constructor(props) {
        super(props)
    }
    onTap(e, inTab) {
        e.stopPropagation()
        if (inTab === this.props.inTab || this.props.goodstradestate === '1') return
        const to = {
            goods: '/pages/detail/index?goodsid=' + this.props.goodsid,
            detail: '/pages/detail/detail/index?goodsid=' + this.props.goodsid,
            assess: '/pages/detail/assess/index?goodsid=' + this.props.goodsid
        }
        Taro.redirectTo({
            url: to[inTab]
        })
    }
    render() {
        const { inTab } = this.props
        return (
            <View className='tab'>
                <View className='content'>
                    <Label
                        className={
                            inTab === 'goods' ? 'option active' : 'option'
                        }
                        onClick={(e) => this.onTap(e, 'goods')}
                    >
                        商品
                    </Label>
                    <Label
                        className={
                            inTab === 'detail' ? 'option active' : 'option'
                        }
                        onClick={(e) => this.onTap(e, 'detail')}
                    >
                        详情
                    </Label>
                    <Label
                        className={
                            inTab === 'assess' ? 'option active' : 'option'
                        }
                        onClick={(e) => this.onTap(e, 'assess')}
                    >
                        评价
                    </Label>
                </View>
            </View>
        )
    }
}
