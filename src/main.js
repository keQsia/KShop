import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
//三级联动组件——全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue';
//参数一：全局组件的名字，参数二：哪一个组件
Vue.component('TypeNav',TypeNav);
import store from '@/store';
//引入MockServer.js
import '@/mock/mockServer';
//引入swiper样式
import 'swiper/css/swiper.css'
import Pagination from '@/components/Pagination/Pagination.vue';
Vue.component('Pagination',Pagination);

// Vue.config.productionTip = false;
//统一api文件夹里面全部请求函数
import * as API from '@/api';
//引入部分组件
import { Button,MessageBox } from 'element-ui';
//unplugin-vue-components/vite没法按需引入，打包会失败，babel插件vite不支持只能直接引入样式文件进行使用
//因为弹框也需要依赖样式，干脆全部引入进来
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button);
//挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = Vue.prototype.$msgbox.alert;
new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate(){
        //安装全局事件总线
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    //注册路由
    router,
    store
})