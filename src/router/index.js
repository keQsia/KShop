//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件
import routes from './routes'
//引入store
import store from '@/store';
//把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
//重写push|replace
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        //call和apply都可以调用函数一次，篡改函数上下文一次
        //call传递参数用逗号隔开，apply方法传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{}, ()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        //call和apply都可以调用函数一次，篡改函数上下文一次
        //call传递参数用逗号隔开，apply方法传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{}, ()=>{});
    }
}
//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savePosition){
        //y=0意味着滚动条在上方
        return {y: 0}
    }
})
//全局守卫，前置守卫（在路由跳转之前进行判断）
/**
 * from 从那个路由来
 * to 到哪个路由去
 * next 放行函数，参数可以指定路由，如果next(false)代表中止跳转回退到from路由
 */
router.beforeEach(async(to, from, next) => {
    next();
    // 获取用户登录token，未登录不一定有token
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name;
    //如果要去的是登录页，直接放行
    if(name){//用户有用户名，说明登录了
        if(to.path=='/login'||to.path=='/register'){//已经登录，去登录页或者注册页，直接跳转到首页
            next('/')
        }else{//去其它页面一律放行
            next();
        }
    }else{//没有用户名，一定没登录
        if(token){//假如有token，尝试获取用户信息
            try {
                //获取用户信息取得登录状态
                await store.dispatch('getUserInfo');
                next();
            } catch (error) {//获取信息失败，意味着token过期，清除token，进入登录界面
                //重新登录，清空参数
                await store.dispatch('userLogout');
                //跳转到登录界面
                next('/login');
            }
        }else{//没有token，以游客身份访问
            //不能去购物车/shopcart，结算页面/addcartsuccess，支付相关/pay，/trade个人中心/center
            let stop = ['/shopcart','/addcartsuccess','/pay','/trade','/center'];
            let ban = stop.some(item=>to.path.includes(item));
            if(ban){
                alert('对不起，请先登录');
                next('/login');
            }else{
                next();
            }
        }
    }
})
export default router;