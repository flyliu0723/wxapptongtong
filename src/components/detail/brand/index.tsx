import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    data: any
}
export default class Brand extends Component<Props> {
    constructor(props) {
        super(props)
    }
    config: Config = {}
    render() {
        let { data } = this.props
        return (
            <View className='brand'>
                {data.brandurl ? (
                    <Image className='logo' src={data.brandurl} />
                ) : (
                    ''
                )}
                <View className='message tab'>
                    <View className='country mess'>
                        {data.country}
                        <Image src={data.countryimg} className='country-img' />
                    </View>
                    <Text className='name mess'>{data.brandname}</Text>
                </View>
                <View
                    className='to tab'
                    onClick={() =>
                        Taro.navigateTo({
                            url: ''
                        })
                    }
                >
                    进入品牌
                    <Image
                        src='//timgs-v1.tongtongmall.com/ef40daf1'
                        className='to-img'
                    />
                </View>
            </View>
        )
    }
}
