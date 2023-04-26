import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token'
//登录与注册模块
const state = {
    //验证码
    code: '',
    //用户令牌
    token: getToken(),
    //用户信息
    userInfo: {}
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    //清除本地数据
    CLEAR(state){
        //vuex清除仓库信息，本地存储清空
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit("GETCODE",result.data);
        }else{
            return Promise.reject(new Error("failed"));
        }
    },
    //用户注册
    async userRegister({commit},userInfo){
        let result = await reqUserRegister(userInfo);
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error("failed"));
        }
    },
    //登录[token]
    async userLogin({commit},userInfo){
        let result = await reqUserLogin(userInfo);
        if(result.code == 200){
            //服务器下发token作为用户唯一标识符，经常通过token找服务器要用户信息展示
            commit('USERLOGIN',result.data.token);
            //将token存储到本地
            setToken(result.data.token);
            return 'ok';
        }else{
            // return Promise.reject(new Error("failed"));
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let res = await reqUserInfo();
        if(res.code == 200){
            //提交用户信息
            commit('GETUSERINFO',res.data);
            return 'ok';
        }else{
            return Promise.reject(new Error("failed"));
        }
    },
    //退出登录
    async userLogout({commit}){
        let res = await reqLogout();
        if(res.code == 200){
            //清除token
            commit('CLEAR');
            return 'ok';
        }else{
            return Promise.reject(new Error("failed"));
        }
    }
}
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}