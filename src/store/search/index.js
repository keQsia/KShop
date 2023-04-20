import {reqGetSearchInfo} from '@/api';
//search专属仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    //获取搜索模块的数据
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code == 200) {
            this.commit("GETSEARCHLIST",result.data);
        }
    }
};
//计算属性，为了简化数据，这样将来取用数据就会方便
const getters = {
    //当前形参state是小仓库中的state
    goodsList(state){
        return state.searchList.goodsList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}