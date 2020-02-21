import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Video } from '@tarojs/components'
import './index.scss'

interface Props {
    imgurl: any
    bnLoad
}

export default class Page extends Component<Props> {
    static defaultProps = {

    }

    topHeight = () => {
        Taro.createSelectorQuery().select('.navfilter').boundingClientRect(rect => {
            this.props.bnLoad(rect.top)
        }).exec()
    }


    render() {
        const { imgurl } = this.props
        return (
            <View className='top-show'>
                {
                    imgurl.vurl ?
                    <Video
                        src={imgurl.vurl}
                        controls={true}
                        autoplay={false}
                        poster={imgurl.url}
                        className='top-img'
                        loop={false}
                        muted={false}
                    /> :
                    <Image src={imgurl.url} className='top-img' onLoad={this.topHeight} />
                }
                {
                    imgurl.desc && 
                    <View className='top-text'>
                        {imgurl.desc}
                    </View>
                }
            </View>
        )
    }
}
