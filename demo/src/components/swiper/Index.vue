<template>
  <div>
    <h1>移动端首页轮播图组件（需要在使用浏览器模拟移动端查看）</h1>
    <a href="https://blog.csdn.net/zhongguohaoshaonian/article/details/90905600">参考别人的组件</a>
    <a href="https://github.com/xiaoshengxianjun/coolvui/tree/master/packages/swiper">git地址</a>
    <div>
      <swiper height="3.4rem" :list="bannerList" effect="zoom"></swiper>
    </div>
    <div class="text">
      <p>实现思路：</p>
      <p>1.先实现普通轮播图</p>
      <p>2.实现有缝隙的轮播图首先确定移动的是ul，使用css3动画translateX进行平滑</p>
      <p>3.touchstart,touchmove,touchend结合,记录开始和结束的点，确定滑动的方向，以及每一屏滑动的距离</p>
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
  .text {
    text-align: left;
  }
</style>
