import { reqCartList, reqDeleteCart, reqUpateChecked } from "@/api";
//仓库存储数据的位置
const state = {
    cartList: []
};
//修改state的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
//action：处理action，可以写自己的业务逻辑，也可以处理异步
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    //删除购物车某个产品
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //修改购物车产品的选中状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpateChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    deleteAllChecked({ dispatch, getters }) {
        //context小仓库，包含commit【提交mutations修改state】,getters【计算属性】,dispatch【派发action】,state【小仓库的数据】
        //获取购物车全部产品
        getters.cartList.cartInfoList.forEach((item) => {
            let promiseAll = [];
            if (item.isChecked) {
                //这是一个请求，需要获取是否成功
                promiseAll.push(dispatch('deleteCart', item.skuId));
            }
            return Promise.all(promiseAll);
        });
    },
    //修改全部产品的选中状态
    updateAllChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateChecked', { skuId: item.skuId, isChecked});
            promiseAll.push(promise);
        });
        //返回结果
        return Promise.all(promiseAll);
    }
};
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    //计算出的购物车的数据

};

//对外暴露Store对象的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})