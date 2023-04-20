import Vue from 'vue';
import Vuex from 'vuex';
// 需要使用一下vuex
Vue.use(Vuex);

//引入组件仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import user from './user';
import trade from './trade';

//对外暴露Store对象的一个实例
export default new Vuex.Store({
    //实现模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});