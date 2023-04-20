<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="changeChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- a标签href属性和click事件冲突时保留a标签特性的最佳解决方式 -->
            <a href="javascript:void(0)" class="mins" @click="handler($event.target.value,'minus',cart)">-</a>
            <!-- 在有参时必须添加$event传参 -->
            <input autocomplete="off" type="text" minnum="1" class="itxt" onkeyup="this.value=this.value.replace(/^[0]+[1-9]*/g,'');" :value="cart.skuNum" @change="handler($event.target.value,'change',cart)">
            <a href="javascript:void(0)" class="plus" @click="handler($event.target.value,'add',cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <!-- 绑定函数连空数据都不传递，默认会传递$event -->
            <a href="javascript:void(0)" class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @click="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:void(0)" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import throttle from 'lodash/throttle';
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData();
      // this.handleAllChecked();
    },
    methods:{
      //获取个人购物车数据
      getData(){
        this.$store.dispatch('getCartList');
      },
      //通过防抖来防止操作过快从而产生负数等非法数据
      handler: throttle(async function(value,type,cart){
        let delta = 0;
        //提交数据需要传递商品id和参数（已经有产品时是数量的变化量）
        switch(type){
          //减少
          case 'minus':
            if(cart.skuNum > 1){
              delta = -1;
            }else{
              return;
            }
            break;
          case 'change':
            //监视用户数据改变是否合法，数值的上限设为99
            if(value == cart.skuNum){
              return;
            }else if(value >= 99){
              this.getData();
            }else{
              delta = value-cart.skuNum;
            }
            break;
          case 'add':
            if(cart.skuNum < 99){
              delta = 1;
            }else{
              return;
            }
            break;
        }
        try {
          await this.$store.dispatch('updateShopCart',{skuId:cart.skuId,skuNum:delta});
          //再获取服务器购物车数据
          this.getData();
        } catch (err) {
          console.log(err.message);
        }
        
      },1000),
      //删除购物车商品，不是响应式数据的变更不会刷新页面
      async deleteCart(id){
        try {
          //删除成功再次请求数据刷新
          await this.$store.dispatch('deleteCart',id);
          this.getData();
          //用路由跳转的方法强制刷新购物车界面
          this.$router.go(0);
        } catch (error) {
          alert(error.message);
        }
      },
      //修改勾选状态，注意表征状态的值是字符串
      changeChecked(cart,event){
        try {
          this.$store.dispatch('updateChecked',{skuId:cart.skuId,isChecked:event.target.checked?'1':'0'});
          this.getData();
          //尽管拉取了数据，但state好像不会立即更新，至少不会可视化，以后再解决这个问题
          this.$router.go(0);
        } catch (error) {
          alert(error.message);
        }
      },
      // deleteAllChecked(){
      //   this.cartInfoList.forEach((item)=>{
      //     if(item.isChecked){
      //       this.deleteCart(item.skuId);
      //     }
      //   });
      // },
      async deleteAllChecked() {
        try {
          await this.$store.dispatch('deleteAllChecked');
          this.getData();
          this.$router.go(0);
        } catch (error) {
          console.log(error.message);
        }
      },
      //修改全部商品的选中状态
      async updateAllCartChecked(event) {
        try {
          let isChecked = event.target.checked?'1':'0';
          await this.$store.dispatch('updateAllChecked',isChecked);
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      }
    },
    computed:{
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList||[];
      },
      //计算产品总价
      totalPrice(){
        let total = 0;
        this.cartInfoList.forEach((item)=>{
          if(item.isChecked){
            total += item.skuPrice * item.skuNum;
          }
        });
        return total;
      },
      //计算全选是否勾上，因为没有监视，所以视图不会发生立即改变
      isAllChecked(){
        return this.cartInfoList.every(item=>item.isChecked==1);
      },
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 13%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>