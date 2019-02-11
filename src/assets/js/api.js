let url = {
    productList: '/manage/product/list',
    details: '/manage/product/detail',
    category: '/manage/category/get_category',
    goodsList:'/manage/category/get_goods',
    login: '/user/login',
    signUp: '/user/sign_up',
    isLogin: '/user/isLogin',
    logout: '/user/logout',
    search: '/user/search'
}

let host = '/api'

for (var key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
    }
}  

export default url
