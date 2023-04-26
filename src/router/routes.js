//引入路由组件
import Login from '@/pages/Login/Login.vue';
import Register from '@/pages/Register/Register.vue';
import Detail from '@/pages/Detail/Detail.vue';
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue';
import ShopCart from '@/pages/ShopCart/ShopCart.vue';
import Trade from '@/pages/Trade/Trade.vue';
import Pay from '@/pages/Pay/Pay.vue';
import PaySuccess from '@/pages/PaySuccess/PaySuccess.vue';
import Center from '@/pages/Center/Center.vue';
//引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder/MyOrder.vue';
import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder.vue';


//路由配置信息，路由路径一定小写
export default [
    {
        path:"/center",
        component:() => import("@/pages/Center/Center.vue"),
        meta:{show:true},
        //二级路由组件，不用写/
        children:[
            {
                path:"myorder",
                component:MyOrder,
            },
            {
                path:"grouporder",
                component:GroupOrder,
            },
            {
                path:"/center",
                redirect:"/center/myorder"
            }
        ]
    },
    {
        path:"/paysuccess",
        name:"paysuccess",
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:"/pay",
        name:"pay",
        component:Pay,
        meta:{show:true},
        beforeEnter:(to,from,next) => {
            //去支付页面必须从交易页来
            if(from.path == "/trade"){
                next();
            }else{
                //其他路由组件停留在当前页面
                next(false);
            }
        }
    },
    {
        path:"/trade",
        name:"trade",
        component:() => import("@/pages/Trade/Trade.vue"),
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next) => {
            //去交易页面必须从购物车来
            if(from.path == "/shopcart"){
                next();
            }else{
                //其他路由组件停留在当前页面
                next(false);
            }
        }
    },
    {
        path:"/shopcart",
        name:"shopcart",
        component:() => import("@/pages/ShopCart/ShopCart.vue"),
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:"/detail/:skuid",
        component:() => import("@/pages/Detail/Detail.vue"),
        meta:{show:true}
    },
    {
        path:"/home",
        component:() => import("@/pages/Home/Home.vue"),
        meta:{show:true}
    },
    {
        path:"/login",
        component:() => import("@/pages/Login/Login.vue"),
        meta:{show:false}
    },
    {
        path:"/register",
        component:() => import("@/pages/Register/Register.vue"),
        meta:{show:false}
    },
    {
        name:"search",
        path:"/search/:keyword?",
        component:() => import("@/pages/Search/Search.vue"),
        meta:{show:true},
        //布尔值写法传递参数
        // props:true,
        //对象写法
        // props:{a:1,b:2}
        //函数写法：params和props参数都可以传递给路由组件
        props:($route) => {
            return {keyword:$route.params.keyword,k:$route.query.k}
        }
    },
    {
        path:"*",
        redirect:"/home"
    }
]