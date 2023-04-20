//引入路由组件
import Home from '@/pages/Home/Home.vue';
import Login from '@/pages/Login/Login.vue';
import Register from '@/pages/Register/Register.vue';
import Search from '@/pages/Search/Search.vue';
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
        component:Center,
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
        meta:{show:true}
    },
    {
        path:"/trade",
        name:"trade",
        component:Trade,
        meta:{show:true}
    },
    {
        path:"/shopcart",
        name:"shopcart",
        component:ShopCart,
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
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/home",
        component:Home,
        meta:{show:true}
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    {
        name:"search",
        path:"/search/:keyword?",
        component:Search,
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