import Taro, { Component } from '@tarojs/taro'
import { View, Text, Icon} from '@tarojs/components'
import './index.scss'

interface Props {
    bnFrom: boolean
    search: String
}

export default class Page extends Component<Props> {
    state = {}


    render() {
        const { bnFrom, search } = this.props
        return (
            <View 
                className='search'
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/search/index'
                    })
                }}
            >
                {
                    bnFrom &&
                    <View className='con'>
                        <Icon size='16' type='search' className='icon' />
                        <Text className='text'>{search}</Text>
                    </View>
                }
            </View>
        )
    }
}
