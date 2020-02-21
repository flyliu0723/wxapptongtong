import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button, ScrollView, } from '@tarojs/components'
import './index.scss'

interface Props {
    hide: any
    data: any
    selected: any
}
export default class Promotion extends Component<Props> {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        data: ''
    }
    state: {
        provs: any
        citys: any
        countrys: any
        inProv: any
        inCity: any
        inCountry: any
        in: any
        inLevel: number
    } = {
        provs: [],
        citys: [],
        countrys: [],
        inProv: '',
        inCity: '',
        inCountry: '',
        in: [],
        inLevel: 0
    }
    config: Config = {}
    componentDidMount() {
        let {data} = this.props
        this.setState({in: data.provs})
    }
    chocie(data) {
        let result: any = []
        if(this.state.inLevel === 0){
            this.props.data.citys.forEach(d => {
                if(d.pid === data.id){
                    result.push(d)
                }
            })
            this.setState({
                inProv: data,
                in: result, 
                inLevel: 1
            })
        }else if(this.state.inLevel === 1){
            this.props.data.countryid.forEach(d => {
                if(d.pid === data.id){
                    result.push(d)
                }
            })
            this.setState({
                inCity: data,
                in: result, 
                inLevel: 2
            })
        }else {
            this.setState({
                inCountry: data
            }, () => {
                const {inProv, inCity, inCountry} = this.state
                this.props.selected({
                    inProv, inCity, inCountry
                })
            })
            
        }
    }
    back(inLevel) {
        let {data} = this.props, result: any = []
        this.setState({
            inLevel
        })
        if(inLevel === 0) {
            this.setState({
                in: data.provs,
                inProv: '',
                inCity: '',
                inCountry: ''
            })
        }else if(inLevel === 1) {
            this.props.data.citys.forEach(d => {
                if(d.pid === this.state.inProv.id){
                    result.push(d)
                }
            })
            this.setState({
                in: result,
                inCity: '',
                inCountry: ''
            })
        }
    }
    render() {
        return (
            <View className='others'>
                <View className='content'>
                    <View className='title'>
                        配送至
                        <Image
                            src='//timgs-v1.tongtongmall.com/30cb13d6'
                            className='close'
                            onClick={this.props.hide}
                        />
                    </View>
                    <View className='lists'>
                        <View className='selected'>
                            <View className={this.state.inProv !== '' ? 'tab' : 'tab active'} onClick={() => this.back(0)}>
                                {
                                    this.state.inProv !== ''
                                        ? this.state.inProv.name
                                        : '请选择'
                                }
                            </View>
                            {
                                this.state.inProv !== ''
                                    ? <View className={this.state.inCity !== '' ? 'tab' : 'tab active'} onClick={() => this.back(1)}>
                                        {
                                            this.state.inCity !== ''
                                                ? this.state.inCity.name
                                                : '请选择'
                                        }
                                    </View>
                                    : ''
                            }
                            {
                                this.state.inCity !== ''
                                    ? <View className={this.state.inCountry !== '' ? 'tab' : 'tab active'} onClick={() => this.back(2)}>
                                        {
                                            this.state.inCountry !== ''
                                                ? this.state.inCountry.name
                                                : '请选择'
                                        }
                                    </View>
                                    : ''
                            }
                        </View>
                        <ScrollView 
                            className='options'
                            scrollY
                            scrollWithAnimation
                            scrollTop={0}
                        >
                            {
                                this.state.in.map(d => {
                                    return <View 
                                                className='list'
                                                key={d.id} 
                                                onClick={() => this.chocie(d)}
                                            >{d.name}</View>
                                })
                            }
                            
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}
