//当前模块统一管理api
import req from './request';
import mockRequests from './mockAjax'
//三级联动接口：http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList:8510 GET请求无参数
//发送请求:axios发请求返回结果是promise对象
export const reqCategoryList = () => req({url:'/api/product/getBaseCategoryList',method:'GET'});

//获取banner首页轮播图接口
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取floors数据
export const reqGetFloorList = () => mockRequests.get('/floor');

//获取搜索模块的数据：/api/list POST请求 需要参数
//函数需要接受参数，这个请求的参数至少是空对象
export const reqGetSearchInfo = (searchParams) => req({url:'/api/list',method:'POST',data:searchParams});

//获取产品详情信息的接口 URL: /item/${skuId} 请求方式：GET
export const reqGoodsInfo = (skuId) => req({url:`/api/item/${skuId}`,method:'GET'});
//需要给vuex传输数据，新增一个模块

//将产品添加到购物车中（获取更新某个产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopChart = (skuId,skuNum) => req({url:`/api/cart/addToCart/${skuId}/${skuNum}`,method:'POST'});

//获取购物车列表数据接口：/api/cart/cartList GET请求
export const reqCartList = () => req({url:'/api/cart/cartList',method:'GET'});

//删除购物车产品的接口
//URL: /api/cart/deleteCart/{skuId} 请求方式：DELETE
export const reqDeleteCart = (skuId) => req({url:`/api/cart/deleteCart/${skuId}`,method:'DELETE'});

//修改商品选中状态 URL：/api/cart/checkCart/{skuId}/{isChecked} 请求方式：GET
export const reqUpateChecked = (skuId,isChecked) => req({url:`/api/cart/checkCart/${skuId}/${isChecked}`,method:'GET'});

//获取验证码 接口：/api/user/passport/sendCode/{phone} method:GET
export const reqGetCode = (phone) => req({url:`/api/user/passport/sendCode/${phone}`,method:'GET'});

//注册 url：/api/user/passport/register method:POST phone password code
export const reqUserRegister = (userInfo) => req({url:'/api/user/passport/register',method:'POST',data:userInfo});

//登录 url：/api/user/passport/login method:POST phone password
export const reqUserLogin = (userInfo) => req({url:'/api/user/passport/login',method:'POST',data:userInfo});

//获取用户信息（需要带着用户的token向服务器要用户信息）URL：/api/user/passport/auth/getUserInfo 请求方式：GET
export const reqUserInfo = () => req({url:'/api/user/passport/auth/getUserInfo',method:'GET'});

//退出登录 URL：/api/user/passport/logout 请求方式：GET
export const reqLogout = () => req({url:'/api/user/passport/logout',method:'GET'});

//获取订单交易页的数据 URL：/api/user/userAddress/auth/findUserAddressList 请求方式：GET 无参
export const reqAddressInfo = () => req({url:'/api/user/userAddress/auth/findUserAddressList',method:'GET'});

//获取订单交易页信息 URL：/api/order/auth/trade GET
export const reqOrderInfo = () => req({url:'/api/order/auth/trade',method:'GET'});

//提交订单 URL：/api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder = (tradeNo,tradeInfo) => req({url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'POST',data:tradeInfo});

//获取支付信息 URL：/api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => req({url:`/api/payment/weixin/createNative/${orderId}`,method:'GET'});

//获取支付订单状态 URL：/api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus = (orderId) => req({url:`/api/payment/weixin/queryPayStatus/${orderId}`,method:'GET'});

//获取个人中心数据 URL：/api/order/auth/{page}/{limit} 请求方式：GET
export const reqMyOrderList = (page,limit) => req({urL:`/api/order/auth/${page}/${limit}`,method:'GET'});
