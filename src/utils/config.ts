export const name = {
    userToken: 'USER_TOKEN',
    authToken: 'AUTH_TOKEN',
    searchHistory: 'SEARCH_HISTORY',
    quickNav: 'QUCIK_NAV',
    authPageOpen: 'AUTH_PAGE_OPEN'
}

// 轮播配置
export const swiper = {
    interval: 3000,
    duration: 300
}

// 接口配置
// export const apiConfig = {
//     url: 'http://saas.api.app.tongtongmall.test/api/',
//     auth: 'http://oauth.app.tongtongmall.test/api/oauth2.0/gettoken',
//     basic: 'dG9uZ3RvbmdtYWxsOjEyMw=='
// }

export const apiConfig = {
    url: 'https://sapi.tongtongmall.com/api/',
    auth: 'https://spapi.tongtongmall.com/api/oauth2.0/gettoken',
    basic: 'dG9uZ3RvbmdtYWxsOnRUb25nfiFAIzc3OQ=='
}

// 从富文本中解析图片地址
// 帮助详情页需要使用
export const regexImage = /http:\/\/tong\.img\.tongtongmall\.com\/\w+/g
