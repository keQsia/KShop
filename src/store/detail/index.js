import {reqGoodsInfo, reqAddOrUpdateShopChart} from '@/api';
//封装游客身份的模块uuid，生成一个唯一标志符
import {getUUID} from '@/utils/uuid_token';

const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid);
        if(result.code == 200) {
            commit("GETGOODINFO",result.data);
        }
    },
    //将产品添加到购物车中
    async updateShopCart({commit},{skuId,skuNum}){
        //因为服务器只是记录数据，返回一个成功或者失败的promise，所以不需要其它操作
        let result = await reqAddOrUpdateShopChart(skuId,skuNum);
        if(result.code == 200){
            return 'ok';
        }else{
            //加入购物车失败
            return Promise.reject(new Error('failed'));
        }
    }
};
const getters = {
    //简化数据
    categoryView(state){
        //categoryView至少是一个空对象，就不会出现假报错了
        return state.goodInfo.categoryView||{};
    },
    //产品信息、图片
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    //售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}