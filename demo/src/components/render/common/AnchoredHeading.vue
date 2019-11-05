<!--例1-->
<!--不需要 template，若template存在，则无法渲染render-->
<!--<template>-->
  <!--<div class="ddd"></div>-->
<!--</template>-->

<script>
  export default {
    props: {
      level: {
        type: Number,
        required: true
      }
    },
    render (createElement) {
      return createElement(
        'h' + this.level, // 标签名称
        this.$slots.default // 子节点数组
      )
    }
  }
</script>

<style>
</style>
