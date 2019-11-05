<template>
  <div class="wrap">
    <h1>render 函数的使用</h1>
    <p class="info">render 函数 跟 template 一样都是创建 html 模板的，但是有些场景中用 template 实现起来代码冗长繁琐而且有大量重复，这时候就可以用 render 函数。</p>
    <div class="tm-one">
      <h1>例1:</h1>
      <anchored-heading :level="2">这是官网例子</anchored-heading>
    </div>
    <div class="tm-one">
      <h1>例2: <el-button type="primary" @click="pName++">点击变化</el-button></h1>
      <example2 :p-name="pName">稍微复杂点的例子</example2>
    </div>
  </div>
</template>

<script>
  import AnchoredHeading from './common/AnchoredHeading'
  import Example2 from './common/Example2'

  export default {
    name: 'Index',
    components: {
      AnchoredHeading,
      Example2
    },
    data () {
      return {
        pName: 2
      }
    }
  }
</script>

<style scoped>
  .wrap {
    margin: 40px auto;
  }

  .info {
    color: #08a0ff;
  }

  .tm-one {
    margin-top: 20px;
    background: #7cb1cc;
    min-height: 200px;
    border: 20px solid #f1c00a;
  }

  .tm-one > h1 {
    font-size: 22px;
    color: red;
  }
</style>
