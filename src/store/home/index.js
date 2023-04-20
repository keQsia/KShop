import { reqCategoryList,reqGetBannerList,reqGetFloorList } from '@/api';
//search专属仓库
const state = {
    //仓库三级菜单的数据
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor数据
    floorList:[]
};
const mutations = {
    CATEGORYLIST(state, categoryList){
        //修改state中的数据
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList;
    }
};
const actions = {
    //通过API中接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code == 200) {
            this.commit("CATEGORYLIST",result.data);
        }
    },
    //获取首页轮播图数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200) {
            this.commit("GETBANNERLIST",result.data);
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code == 200) {
            this.commit("GETFLOORLIST",result.data);
        }
    }
};
//计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}