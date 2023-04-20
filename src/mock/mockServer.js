//引入mockjs模块
import Mock from 'mockjs';
//引入mock数据
import banner from './banner.json';
import floor from './floors.json';

//mock数据第一个参数请求地址，第二个参数请求数据
Mock.mock('/mock/banner',{code:200,data:banner});//模拟轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor});