<template>
  <div>
    <h1>仿ios滚动选择器 h5插件</h1>
    <a href="https://www.cnblogs.com/zhangkunweb/p/iosSelect.html">参考别人的组件</a>
    <a href="https://github.com/zhangKunUserGit/vue-component">git地址</a>
    <div style="width: 300px;margin: 20px auto;">
      <scroll-picker :slectValue="1" :list="[2,3,4,5,1]" @select="changeScrollPicker"></scroll-picker>
    </div>
    <div class="text">
      <p>实现思路：</p>
      <p>1.循环滚动需要不断刷新li</p>
      <p>2.利用css3d css3的 transform-style: preserve-3d; 和 backface-visibility: hidden; transform: rotate3d(1, 0, 0, 0deg)
        translate3d(0, 0, 100px) 画出视觉上的半圆</p>
      <p>3.计算半圆能展示的li条数，及每条rotate的角度，并取奇数使得选中行上下对称</p>
      <p>4.touchstart,touchmove,touchend结合,记录开始和结束的点，确定滑动的方向，以及每一屏滑动的距离，计算加速度</p>
    </div>

    <div class="text">
      <p>插件改进：1、新增选中初值功能 2、根据slectValue使得父组件可以操控选择器使其重新渲染为指定值</p>
      <p>插件还存在的问题：改进不全面，1、父组件利用slectValue渲染时，动画效果有出入 2、slectValue不代表当前选中值，如需获取需要结合select及初值slectValue自己记录</p>
    </div>
  </div>
</template>
<script>
  import ScrollPicker from './common/iosSelectPicker/ScrollPicker'

  export default {
    name: 'h5Plugins',
    components: {ScrollPicker},
    comments: {
      ScrollPicker
    },
    data () {
      return {}
    },
    methods: {
      changeScrollPicker (val) {
        console.log('选择器选中值：' + val)
      }
    }
  }
</script>
<style lang="less" scoped>
  .text {
    text-align: left;
  }
</style>
