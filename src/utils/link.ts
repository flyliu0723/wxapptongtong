import Taro from '@tarojs/taro'

export interface APILinkType {
    type: number
    link: string
    parameter: string
}

// 将自定义链接转为系统链接
const customLink = (option: any): APILinkType => {
    const link =
        (option.label || []).indexOf('拼团') >= 0
            ? 'group-detail'
            : option.link || ''
    return {
        type: option.click || '',
        parameter: option.args || '',
        link
    }
}

export default (to: APILinkType) => {
    // 如果有 click 字段 表示 自定义 链接
    if ((to as any).click !== undefined) {
        to = customLink(to)
    }

    // 绝对链接地址
    if (to.type === 2) {
        // 打开 webview
        // to.link
    }
    // 系统链接
    switch (to.link) {
        case 'search':
            // 没有参数 跳转到搜索页
            // 有参数 跳转到商品列表页
            if (!to.parameter) {
                return Taro.navigateTo({
                    url: `/pages/search/index`
                })
            } else {
                return Taro.navigateTo({
                    url: `/pages/list/index?search=${to.parameter}`
                })
            }
        case 'category':
            return Taro.navigateTo({
                url: `/pages/list/index?classifyid=${to.parameter}`
            })
        case 'goodslist':
            return Taro.navigateTo({
                url: `/pages/list/index?search=${to.parameter}`
            })
        case 'taglist':
            return Taro.navigateTo({
                url: `/pages/list/index?tagid=${to.parameter}`
            })
        case 'gobrandbyname':
            return Taro.navigateTo({
                url: `/pages/list/index?brand=${to.parameter}`
            })
        case 'gobrandbyid':
            return Taro.navigateTo({
                url: `/pages/list/index?brandid=${to.parameter}`
            })
        case 'user':
            return Taro.navigateTo({
                url: `/pages/center/index`
            })
        case 'shopping':
            return Taro.navigateTo({
                url: `/pages/card/index`
            })
        case 'order':
            return Taro.navigateTo({
                url: `/pages/order/index`
            })
        case 'goodsinfo':
            return Taro.navigateTo({
                url: `/pages/detail/index?goodsid=${to.parameter}`
            })
        default:
            return Taro.navigateTo({
                url: '/pages/index/index'
            })
    }
}
