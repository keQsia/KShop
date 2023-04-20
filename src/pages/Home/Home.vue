<template>
  <div>
    <!-- 三级联动全局组件，无需引入 -->
    <TypeNav></TypeNav>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script lang='js'>
  import ListContainer from './ListContainer/ListContainer.vue';
  import Recommend from './Recommend/Recommend.vue';
  import Rank from './Rank/Rank.vue';
  import Like from './Like/Like.vue';
  import Floor from './Floor/Floor.vue';
  import Brand from './Brand/Brand.vue';
  import { mapState } from 'vuex';
  export default {
    name:'Home',
    components:{ListContainer, Recommend, Rank, Like, Floor, Brand},
    mounted(){
      //通过vuex发送请求，获取数据，存储于仓库当中
      this.$store.dispatch('categoryList',);
      this.$store.dispatch('getFloorList');
    },
    computed:{
      //将仓库中的数据映射为组件上的计算属性
      ...mapState({
        floorList:state => state.home.floorList
      })
    }
  }
</script>

<style scoped lang='less'>
  
</style>