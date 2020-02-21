import Taro, { Component } from '@tarojs/taro'
import { View, Text, Icon, Button } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
    ids: any
    cancel: any
    type: string
    bnOk: any
}

export default class Page extends Component<Props> {
    state: {
        checkIds: any[]
        title: String
        isAll: boolean
        data: any
    } = {
        checkIds: this.props.ids,
        title: this.props.type === 'brand' ? '品牌' : '国别',
        isAll: this.props.ids && this.props.ids.length === 0 ? true : false,
        data: []
    }


 
    bnCheck = (i) => {
        let data = Object.assign([], this.state.data)
        data[i].ischeck ? data[i].ischeck = false : data[i].ischeck = true

        this.setState({data})
    }

    // 重置全部
    reset = () => {
        this.setState({
            isAll: true,
            checkIds: []
        })
    }

    isOk = () => {
        let ids:any = []
        let data = Object.assign([], this.state.data)
        data.map(val => {
            val.ischeck && ids.push(val)
        })
        this.setState({
            checkIds: ids
        },() => {
            this.props.bnOk('brand', this.state.checkIds)
            this.props.cancel()
        })
        
        
    }


    componentDidMount() {
        let data = Object.assign([], this.props.data)
        let ids = Object.assign([], this.state.checkIds)
        data = data.map(item => {
            let check = this.props.type === 'brand' ? item.couponid : item.countryid
            ids.indexOf(check) !== -1 ? item.ischeck = true : item.ischeck = false
            return item
        }) 
        this.setState({data})
    }



    render() {
        const { checkIds, title, isAll, data } = this.state
        const { type } = this.props
        return (
            <View className='comy_con'>
                <View className='title'>
                    <Text 
                        className='float_left' 
                        onClick={() => this.props.cancel()}
                    >
                        取消
                    </Text>
                    <Text>{title}</Text>
                    <Text 
                        className='float_right' 
                        onClick={() => this.isOk()}
                    >
                        确定
                    </Text>
                </View>
                <Text className='list_title'>{title}列表</Text>
                <View className='fixed_list'>
                    <View 
                        className='list_text'
                        onClick={() => this.reset()}
                    >
                        全部
                        {
                            (isAll && checkIds.length === 0) && 
                            <Icon className='icon_img' type='success_no_circle' color='red' size='20'  />
                        }
                    </View>
                    {
                        data.map((item, i) => (
                            <View 
                                key={i} 
                                className='list_text'
                                onClick={() => this.bnCheck(i)}
                            >
                                {type === 'brand' ? item.couponname : item.countryname}
                                {
                                    item.ischeck &&
                                    <Icon className='icon_img' type='success_no_circle' color='red' size='20'  />
                                }      
                            </View>
                        ))
                    }

                    <Button 
                        className='reset'
                        onClick={() => this.reset()}
                    >
                        重置选项
                    </Button>
                </View>
            </View>
        )
    }
}
