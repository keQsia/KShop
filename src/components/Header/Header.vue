<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>KShop欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航 -->
            <RouterLink to="/login">登录</RouterLink>
            <RouterLink to="/register" class="register">免费注册</RouterLink>
          </p>
          <p v-else>
            <span>欢迎您，{{userName}}</span>
            <a href="###" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的会员</a>
          <a href="###">卖家中心</a>
          <a href="###">企业采购</a>
          <a href="###">关注KShop</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <RouterLink class="logo" to="/home">
          <img src="./images/logo.png" alt="">
        </RouterLink>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" @keyup.enter="goSearch" ref="searchInput" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang='js'>

  export default {
    name: "Header",
    data() {
      return {
        //搜索框的值
        keyword: ""
      };
    },
    methods: {
      goSearch() {
        //搜索回调函数，向search路由跳转
        // 获取输入框的值
        // const keyword = document.getElementById("autocomplete").value;
        //第一种传参：跳转到搜索页面
        // this.$router.push(`/search/${this.keyword}`);
        //第二种传参：字符串形式传递query和params参数
        // this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase());
        //第三种传参：对象，注意对象传参一定要配置name属性
        // this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}});
        //**路由传递参数（对象写法）path不可以结合params使用，name可以结合params使用：
        // this.$router.push({path:'/search/',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}});
        //**如何指定params可传可不传，在配置路由的时候，在占位的后面加上一个?即可
        // this.$router.push({ name: "search", query: { k: this.keyword.toUpperCase() } });
        //如果传递空串，可以使用undefined解决
        let location = {name:"search",params:{keyword:this.keyword||undefined}};
        location.query = this.$route.query;
        this.$router.push(location);
        //**路由组件可以传递props参数，有三种写法
      },
      deleteInput(){
        //清空输入框中的关键字
        this.$refs.searchInput.value = '';
      },
      //退出登录回调
      logout(){
        try {
          //请求服务器
          this.$store.dispatch('userLogout');
          //如果退出成功，跳转到首页
          this.$router.push('/home');
        } catch (error) {
          
        }
        
      }
    },
    mounted(){
      this.$bus.$on("deleteInput",this.deleteInput);
    },
    computed:{
      userName(){
        return this.$store.state.user.userInfo.name;
      }
    }
}
</script>

<style scoped lang='less'>
  .header {
      &>.top {
          background-color: #eaeaea;
          height: 30px;
          line-height: 30px;

          .container {
              width: 1200px;
              margin: 0 auto;
              overflow: hidden;

              .loginList {
                  float: left;
                  margin-left: 20px;

                  p {
                      float: left;
                      margin-right: 10px;

                      .register {
                          border-left: 1px solid #b3aeae;
                          padding: 0 5px;
                          margin-left: 5px;
                      }
                  }
              }

              .typeList {
                  float: right;
                  margin-right: 20px;
                  a {
                      padding: 0 10px;

                      &+a {
                          border-left: 1px solid #b3aeae;
                      }
                  }

              }

          }
      }

      &>.bottom {
          width: 1200px;
          margin: 0 auto;
          overflow: hidden;

          .logoArea {
              float: left;

              .logo {
                  img {
                      width: 175px;
                      margin: 25px 20px;
                  }
              }
          }

          .searchArea {
              float: right;
              margin-top: 35px;

              .searchForm {
                  overflow: hidden;
                  margin-right: 25px;
                  input {
                      box-sizing: border-box;
                      width: 490px;
                      height: 32px;
                      padding: 0px 4px;
                      border: 2px solid #ea4a36;
                      float: left;

                      &:focus {
                          outline: none;
                      }
                  }

                  button {
                      height: 32px;
                      width: 68px;
                      background-color: #ea4a36;
                      border: none;
                      color: #fff;
                      float: left;
                      cursor: pointer;

                      &:focus {
                          outline: none;
                      }
                  }
              }
          }
      }
  }
</style>