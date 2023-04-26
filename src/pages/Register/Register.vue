<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="javascript:void(0)" @click="$router.push('/login')">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- 必须带有name字段，标注哪个字段需要验证 -->
        <input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="{required:true,regex:/^1\d{10}$/}" :class="{invalid:errors.has('phone')}">
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" name="code" v-validate="{required:true,regex:/^\d{6}$/}" :class="{invalid:errors.has('code')}">
        <button id="gcode" @click="getCode">获取验证码</button>
        <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password" name="password" v-validate="{required:true,regex:/^[0-9A-Za-z]{8,20}$/}" :class="{invalid:errors.has('password')}">
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1" name="password1" v-validate="{required:true,is:password}" :class="{invalid:errors.has('password1')}">
        <span class="error-msg">{{ errors.first('password1') }}</span>
      </div>
      <div class="controls">
        <input name="agree" type="checkbox" :checked="agree" v-validate="{required:true,'agree':true}" :class="{invalid:errors.has('agree')}">
        <span>同意协议并注册《KShop用户协议》</span>
        <span class="error-msg">{{ errors.first('agree') }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机KShop</li>
        <li>销售联盟</li>
        <li>KShop社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        //手机号
        phone: '',
        //验证码
        code: '',
        //密码
        password: '',
        //确认密码
        password1: '',
        //是否同意
        agree: false
      }
    },
    methods: {
      async getCode(){
        try {
          const {phone} = this;
          phone && (await this.$store.dispatch('getCode',phone));
          //将组件的code属性值变为仓库中的验证码
          this.code = this.$store.state.user.code;
        } catch (error) {
          console.log(error.message)
        }
      },
      //用户注册
      async userRegister(){
        const success = await this.$validator.validateAll();
        //全部表单验证成功再发送请求
        if(success){
          try {
            const {phone,code,password,password1,agree} = this;
            await this.$store.dispatch('userRegister',{phone,password,code});
            //成功跳转
            this.$router.push('/login');
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        #gcode {
          width: 80px;
          height: 30px;
          margin-left: 5px;
          background-color: #e1251b;
          border-radius: 0;
          font-family: 微软雅黑;
          word-spacing: 4px;
          border: 1px solid #e1251b;
          color: #fff;
        }

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>