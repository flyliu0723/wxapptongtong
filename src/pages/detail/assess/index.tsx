import Taro, { Component, Config } from '@tarojs/taro'
import {
    View,
    Text,
    Label,
    Image,
    ScrollView,
    Button
} from '@tarojs/components'
import http from '../../../utils/http'
import './index.scss'
import Header from '../../../components/detail/header'
import Bottom from '../../../components/detail/bottom'
import Assess from '../../../components/detail/assessTab'

export default class Page extends Component {
    state = {
        curpage: 1,
        pagesize: 15,
        type: 1,
        btns: [],
        list: [],
        canload: true,
        goodsid: this.$router.params.goodsid 
    }
    config: Config = {
        navigationBarTitleText: '商品详情'
    }
    componentWillMount() {
        this.updateList()
    }
    updateList() {
        if (this.state.canload) {
            this.setState({
                canload: false
            })
            http.get('product/prodetail-comment', {
                goodsid: this.state.goodsid,
                type: this.state.type,
                curpage: this.state.curpage,
                pagesize: this.state.pagesize
            }).then((d) => {
                let list = this.state.list
                this.setState({
                    btns: d.data.buttonlist,
                    list: list.concat(d.data.list),
                    canload: true
                })
            })
        }
    }
    loadmore() {
        if (this.state.canload) {
            this.setState(
                {
                    curpage: this.state.curpage + 1
                },
                () => {
                    this.updateList()
                }
            )
        }
    }
    tapBtn(type) {
        if (this.state.canload) {
            this.setState(
                {
                    type
                },
                () => {
                    this.updateList()
                }
            )
        }
    }
    render() {
        return (
            <View className='view'>
                <Header inTab='assess' goodsid={this.state.goodsid}/>
                <View className='action'>
                    {this.state.btns.map((b: any) => {
                        return (
                            <Button
                                className={
                                    b.type == this.state.type ? 'active' : ''
                                }
                                onClick={() => this.tapBtn(b.type)}
                            >
                                {b.name}
                            </Button>
                        )
                    })}
                </View>
                <ScrollView
                    style={{
                        height: 'calc(100vh - 100px)',
                        marginBottom: '50px'
                    }}
                    lowerThreshold={100}
                    scrollY
                    scrollWithAnimation
                    scrollTop={0}
                    upperThreshold={20}
                    onScrollToLower={this.loadmore.bind(this)}
                >
                    {this.state.list.map((d) => {
                        return <Assess data={d} />
                    })}
                </ScrollView>
                <Bottom />
            </View>
        )
    }
}
