<template>
  <div class="type-nav">
    <div class="container">
        <div @mouseleave="leaveIndex" @mouseover="enterShow">
          <h2 class="all">全部商品分类</h2>
          <!-- 三级联动组件 -->
          <transition name="sort">
            <div class="sort" v-show="show">
              <div class="all-sort-list2" @click="goSearch">
                <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur: currentIndex == index }">
                  <h3 @mouseenter="changeIndex(index)">
                    <a style="cursor: pointer;" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  </h3>
                  <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dl class="fore">
                        <dt>
                          <a style="cursor: pointer;" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                        </dt>
                        <dd>
                          <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                            <a style="cursor: pointer;" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">KShop超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script lang='js'>
  import { mapState } from 'vuex';
  import throttle from 'lodash/throttle';
  export default {
    name:'TypeNav',
    data(){
      return {
        //存储用户鼠标移到哪个一级分类
        currentIndex:-1,
        show: false
      }
    },
    //组件挂载完毕，可以向服务器发送请求
    mounted(){
      if(this.$route.path.includes("/home")){
        this.show = true;
      };
    },
    computed:{
      //右侧需要一个函数。当使用这个计算属性的时候，右侧函数会粒级执行一次
      //注入一个参数state，即大仓库中的数据
      ...mapState({
        categoryList:state => state.home.categoryList
      })
    },
    methods: {
      //鼠标进入修改currentIndex属性
      //throttle函数不要使用箭头函数，有可能出现上下文this指向错误
      changeIndex:throttle(function(index){
        //index:鼠标移到某个一级分类的元素索引值
        this.currentIndex = index;
      },60),
      //鼠标移出的事件回调
      leaveIndex(){
        this.currentIndex = -1;
        if(!this.$route.path.includes("/home")){
          this.show = false;
        }
      },
      goSearch(event){
        //最佳方法是编程式导航加事件委派
        let element = event.target;
        //获取当前触发这个事件 的节点h3、a、dt、dl，只需要有data-cayeoryName属性的节点
        //节点有dataset属性值，可以通过解构获取自定义属性与值，注意全部小写化了
        let {categoryname,category1id,category2id,category3id} = element.dataset;
        //有categoryName属性，说明是a标签
        if(categoryname){
          //准备路由跳转的参数对象
          let location = {name:"search"};
          let query = {categoryName: categoryname};
          //多级分类a标签
          if (category1id) {//比如这个一定是一级目录
            query.category1Id = category1id;
          } else if (category2id) {
            query.category2Id = category2id;
          } else if (category3id) {
            query.category3Id = category3id;
          };
          //动态给location添加query属性
          location.query = query;
          //假设存在params参数必须捎带
          location.params = this.$route.params;
          //编程式导航
          this.$router.push(location);
        }
      },
      //鼠标移入，让商品分类列表进行展示
      enterShow(){
        this.show = true;
      }
    }
  }
</script>

<style scoped lang='less'>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2::-webkit-scrollbar {
          display: none;
        }
        .all-sort-list2 {
          height: 450px;
          overflow: auto;
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
          }
          .cur {
            background-color: skyblue;
          }
        }
      }
      //过渡动画样式
      //开始状态（进入）
      .sort-enter {
        height: 0px;
      }
      //结束状态（进入）
      .sort-enter-to {
        height: 461px;
      }
      //定义动画时间、速率
      .sort-enter-active {
        transition: all 0.2s linear;
      }
    }
  }
</style>