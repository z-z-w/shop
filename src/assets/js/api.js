let url = {
    productList: '/manage/product/list',
    details: '/manage/product/detail',
    category: '/manage/category/get_category',
    goodsList:'/manage/category/get_goods',
    login: '/user/login',
    signUp: '/user/sign_up',
    isLogin: '/user/isLogin',
    logout: '/user/logout',
    search: '/user/search',
    saveAddress: '/user/save_address',
    getAddress: '/user/get_address',
    deleteAddress: '/user/delete_address',
    addToCart: '/user/add_to_cart',
    getCart: '/user/get_cart',
    updateCart: '/user/update_cart',
    addOrder: '/user/add_order',
    getOrderList: '/user/get_orderList',
    getOrderConfirm: '/user/get_orderConfirm'
}

let host = '/api'

for (var key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
    }
}  

export default url
