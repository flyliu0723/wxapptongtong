import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import link from '../../../utils/link'

interface Props {
    data: any[]
}

export default class Page extends Component<Props> {
    state = {
        data: [],
        move: false
    }

    componentWillReceiveProps(props) {
        if (this.state.data.length === 0) {
            if (props.data.length !== 0) {
                this.setState(
                    {
                        data: props.data
                    },
                    this.onStart
                )
            }
        }
    }

    onStart = () => {
        setInterval(() => {
            this.setState(
                {
                    move: true
                },
                () => {
                    setTimeout(() => {
                        this.setState((state: any) => {
                            state.move = false
                            state.data.push(state.data[0])
                            state.data.splice(0, 1)
                            return state
                        })
                    }, 300)
                }
            )
        }, 2500)
    }

    render() {
        return (
            <View className='index-notice'>
                <Image
                    src='https://timgs-v1.tongtongmall.com/697222'
                    className='icon'
                />
                <View className='list'>
                    {this.state.data.map((item: any, i) => {
                        return (
                            <View
                                onClick={() => link(item.link)}
                                className={
                                    'item' +
                                    (i === 0 && this.state.move ? ' move' : '')
                                }
                                key={item.title}
                            >
                                {item.title}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}
