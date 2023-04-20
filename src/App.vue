<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script lang='js'>
  import Header from './components/Header/Header.vue';
  import Footer from './components/Footer/Footer.vue';
  export default {
    name:'App',
    components:{Header,Footer}
  }
</script>

<style>
  
</style>