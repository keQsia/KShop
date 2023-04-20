import {v4 as uuidv4} from 'uuid';
//生成一个随机字符串，每次执行不变化，游客身份持久存储
export const getUUID = () => {
    //先查询本地存储
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //假如没有生成一个
    if(!uuid_token){
        //生成一个新的
        uuid_token = uuidv4();
        //存储到本地
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}