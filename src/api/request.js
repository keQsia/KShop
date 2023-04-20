//对axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';
//引入store
import store from '@/store';

//利用axios.create方法创建一个新的axios实例
//request是一个新的经过配置的axios实例
const req = axios.create({
    baseURL: '/api',
    //请求超时的时间
    timeout: 5000
});
//请求拦截器
req.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token){
        //请求头添加被服务器认可的字段，用于标识游客身份
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    //进度条开始
    nprogress.start();
    //config是配置对象，对象中的headers请求头很重要
    return config;
},(error) => Promise.reject(error));

//响应拦截器
req.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done();
    //res是响应对象，服务器返回数据后，响应拦截器可以对响应对象做一些事情
    return res.data;
}, (error) => {
    //error是错误对象
    return Promise.reject(error);
});

//对外暴露
export default req;