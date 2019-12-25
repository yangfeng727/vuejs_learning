<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>vue 国际化配置：{{ msg2 }}</h1>
    <h2>Essential Links</h2>
    <p>测试
      <el-button @click="addObj">点击新增对象属性</el-button>
    </p>
    <p v-if="obj.show">显示。。。。。。。。。。。。。。。。</p>
    <p>文件下载显示案例：<span class="s-file" v-html="$downloadFile('https://fuss10.elemecdn.com/a_ddd.xls')"></span></p>
  </div>
</template>

<script>
  import $ from 'jQuery'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        msg2: this.$t('hello'),
        htmlBgColor: '',
        obj: {}
      }
    },
    mounted () {
      this.htmlBgColor = $('html').css('background')
      console.log(this.htmlBgColor)
      $('body').css('background', '#ccc')
    },
    beforeDestroy () {
      $('body').css('background', this.htmlBgColor)
    },
    methods: {
      addObj () {
        // this.obj.show = true
        if ('show' in this.obj) {
          this.obj.show = !this.obj.show
        } else {
          this.$set(this.obj, 'show', true) // 对象用$set新增属性
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
