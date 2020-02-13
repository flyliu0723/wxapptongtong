import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import http from '../../../utils/http'

interface Props {
    checkAll: any
    list: any
    data: any
    getdata: any
    empty: any
}

export default class Page extends Component<Props> {
    state = {
        bnCheck: false
    }

    componentWillReceiveProps(props) {
        this.setState({
            bnCheck: this.props.data.length === props.list.length ? true : false
        })
    }

    check = () => {
        this.setState(
            {
                bnCheck: !this.state.bnCheck
            },
            () => {
                this.props.checkAll(this.state.bnCheck)
            }
        )
    }

    move = () => {
        let check = this.state.bnCheck
        http.post('user/my-follow-products-del', {
            goodsids: check ? [] : this.props.list,
            type: check ? 2 : 1
        }).then((d) => {
            this.props.getdata()
            this.props.empty()
        })
    }

    render() {
        const { bnCheck } = this.state
        return (
            <View className='bottom'>
                <View className='checkAll'>
                    <View
                        className={bnCheck ? 'check-btn select' : 'check-btn'}
                        onClick={() => this.check()}
                    />
                    全选
                </View>
                <View className='move' onClick={() => this.move()}>
                    移除
                </View>
            </View>
        )
    }
}
