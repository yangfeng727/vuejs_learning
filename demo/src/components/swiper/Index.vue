<template>
  <div>
    <h1>移动端首页轮播图组件</h1>
    <a href="https://blog.csdn.net/zhongguohaoshaonian/article/details/90905600">参考别人的组件</a>
    <a href="https://github.com/xiaoshengxianjun/coolvui/tree/master/packages/swiper">git地址</a>
    <div>
      <swiper height="3.4rem" :list="bannerList" effect="zoom"></swiper>
    </div>
    <div>
      <p>实现思路：1.安装</p>
    </div>
  </div>
</template>
<script>
  import Swiper from './Swiper'

  export default {
    name: 'SwiperIndex',
    components: {Swiper},
    comments: {
      Swiper
    },
    data () {
      return {
        bannerList: [1, 2, 3, 4, 5]
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
