<template>
  <div>
    <div class="pagination">
    <button v-show="ifEnough[3]*centerCal[3]==1" @click="$emit('getPageNo',1)">1</button>
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-show="ifEnough[1]*centerCal[1]==1">···</button>

    <!-- 中间部分，计算当前规模缩小就不需要偏移量了 -->
    <button v-for="(page, index) in realContinues" :key="index"
      @click="$emit('getPageNo',page+pageAdder)"
      :class="{active:pageNo==page+pageAdder}">{{ page+pageAdder}}</button>
    
    <button v-show="ifEnough[2]*centerCal[2]==1">···</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button v-show="ifEnough[4]*centerCal[4]==1" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
     
    <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
  </div>
</template>

<script lang='js'>
  export default {
    name:'Pagination',
    props:['total','pageSize','pageNo','continues'],
    //计算属性
    computed: {
      //总共页数
      totalPage(){
        //向上取整
        return Math.ceil(this.total/this.pageSize);
      },
      // 连续页面数
      realContinues(){
        return this.continues > this.totalPage ? this.totalPage : this.continues;
      },
      //总页码在continues+4以下的情况，意味着要删除省略号、首页或者尾页，甚至缩小规模
      ifEnough(){//返回数组[是否缩减规模，左省略，右省略，首页，尾页]缩减为0，显示为1
        let pindex = Math.ceil(this.continues/2);
        if(this.totalPage < this.continues){//缩小规模
          return [0,0,0,0,0];
        }else if(this.totalPage == this.continues){//首尾消失，省略消失
          return [1,0,0,0,0];
        }else if(this.totalPage == this.continues+1){//首尾消失一个，省略消失
          return this.pageNo > pindex ? [0,0,0,1,0] : [0,0,0,0,1];
        }else if(this.totalPage == this.continues+2){
          if(this.pageNo == pindex+1){//省略消失
            return [1,0,0,1,1];
          }else if(this.pageNo < pindex+1){//首页消失，左省略消失
            return [1,0,1,0,1];
          }else{//尾页消失，右省略消失
            return [1,1,0,1,0];
          }
        }else if(this.totalPage == this.continues+3){//左右省略消失一个
          if(this.pageNo < pindex+1){//首页消失，左省略消失
            return [1,0,1,0,1];
          }else if(this.pageNo == pindex+1){//左省略消失
            return [1,0,1,0,1];
          }else if(this.pageNo == pindex+2){//右省略消失
            return [1,1,0,1,0];
          }else{//尾页消失，右省略消失
            return [1,1,0,1,0];
          }
        }else{//完整情况
          return [1,1,1,1,1];
        }

      },
      //计算偏移量，让当前页最好在中间,假定页数足够，默认continues5页考虑
      centerCal(){//返回一个数组[偏移量，左省略，右省略，首页，尾页]显示为1，不显示为0
        //pindex默认为3
        let pindex = Math.ceil(this.continues/2);
        if(this.pageNo == pindex+1){//左省略没了，首页显示
          return [1,0,1,1,1];
        }else if(this.pageNo < pindex+1){//首页也没了
          return [0,0,1,0,1];
        }else if(this.pageNo == this.totalPage-pindex){//右省略没了，尾页显示
          return [this.totalPage-this.continues-1,1,0,1,1];
        }else if(this.pageNo > this.totalPage-pindex){//尾页也没了
          return [this.totalPage-this.continues,1,0,1,0];
        }else{
          return [this.pageNo-pindex,1,1,1,1];
        }
      },
      //计算增加的页数
      pageAdder(){
        return this.ifEnough[0]*this.centerCal[0];
      }
    }
  }
</script>

<style scoped lang='less'>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: rgba(255,37,27,0.8);
        color: #fff;
      }
    }
  }
</style>