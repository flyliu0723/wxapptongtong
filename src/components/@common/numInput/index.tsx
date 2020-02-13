// 快速导航组件

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import './index.scss'

interface Props {
    min?: number
    max?: number
    change: any
    small?: boolean
    value?: string
    right?: boolean
}
export default class Page extends Component<Props> {
    static defaultProps = {
        min: 1,
        max: 99,
        small: false,
        right: true
    }
    constructor(props) {
        super(props)
    }
    state: {
        num: number
        step: number
        value: string
    } = {
        num: 1,
        step: 1,
        value: '1'
    }
    componentWillMount() {
        this.setState({
            num: Number(this.props.value)
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            num: Number(nextProps.value)
        })
    }
    rightNum(num) {
        if (num < this.props.min) {
            return this.props.min
        }
        if (num > this.props.max) {
            return this.props.max
        }
        return num
    }
    render() {
        let { min, max, small } = this.props
        return (
            <View
                className={small ? 'num small' : 'num'}
                style={{ float: this.props.right ? 'right' : 'left' }}
            >
                <View
                    className={
                        this.state.num <= min ? 'action disabled' : 'action'
                    }
                    onClick={() => {
                        this.setState(
                            {
                                num: this.rightNum(
                                    this.state.num - this.state.step
                                )
                            },
                            () => {
                                this.props.change(this.state.num)
                            }
                        )
                    }}
                >
                    -
                </View>
                <View className='input'>
                    <Input
                        type='number'
                        className='num-input'
                        value={this.state.num.toString()}
                        onInput={(e: any) => {
                            let value = e.target.value
                            if (isNaN(value)) {
                                return ''
                            } else {
                                let num = this.rightNum(Number(value))
                                this.setState({ num }, () => {
                                    this.props.change(this.state.num)
                                })
                                return num
                            }
                        }}
                    />
                </View>
                <View
                    className={
                        this.state.num >= max ? 'action disabled' : 'action'
                    }
                    onClick={() => {
                        this.setState(
                            {
                                num: this.rightNum(
                                    this.state.num + this.state.step
                                )
                            },
                            () => {
                                this.props.change(this.state.num)
                            }
                        )
                    }}
                >
                    +
                </View>
            </View>
        )
    }
}
