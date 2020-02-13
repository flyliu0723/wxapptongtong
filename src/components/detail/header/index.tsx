import Taro, { Component, Config } from '@tarojs/taro'
import { View, Label } from '@tarojs/components'
import './index.scss'

interface Props {
    inTab: string
}

export default class Header extends Component<Props> {
    config: Config = {}
    onTap(e, inTab) {
        e.stopPropagation()
        if (inTab === this.props.inTab) return
        const to = {
            goods: '/pages/detail/index',
            detail: '/pages/detail/detail/index',
            assess: '/pages/detail/assess/index'
        }
        Taro.navigateTo({
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
