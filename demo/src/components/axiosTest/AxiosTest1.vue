<template>
  <div>
    <h1 class="title">{{ msg }}</h1>
    <el-button @click="getMethod">get请求</el-button>
    <el-button @click="postMethod">post请求</el-button>

    <!--表单提交-->
    <form ref="form">
      First name:<br>
      <input type="text" name="firstname" value="Mickey">
      <br>
      Last name:<br>
      <input type="text" name="lastname" value="Mouse">
      <br><br>
      <input type="submit" @click="formMethod" value="表单提交">
    </form>
  </div>
</template>

<script>
  export default {
    name: 'AxiosTest1',
    data () {
      return {
        msg: 'axios 封装测试'
      }
    },
    methods: {
      getMethod () { // 当前接口对应的后端地址为targetUrl.testUrl
        this.$httpGET('/jquery/test1.txt?parama="sssss"').then((response) => {
          console.log(response.data)
        })
      },
      formMethod () {
        let formData = new FormData(this.$refs.form)// 获取表单数据
        this.$httpForm('/api/demo/demo_form.asp', formData).then((response) => {
          console.log(response, '表单数据获取demo application/x-www-form-urlencoded')
        })
      },
      postMethod () { // 当前接口对应的后端地址为targetUrl.dev
        this.$httpPOST('/userInfo/updateLoginPasswd.do', {
          passwdOld: 'david123',
          loginPasswd: 'david123',
          passwdConfirm: 'david123'
        }).then((response) => {
          console.log(response, 'post方式获取数据')
        })
      },
      /**
       *  从nodejs里面返回的数据，当前接口对应的后端地址为targetUrl.nodejs，需要启动 xxx\nodejs_learning\learnFromVideo\mysql_operate\test>nodemon app.js
       * */
      getDataFromNode () {
        this.$httpGET('/searchStudent/list.do').then((response) => {
          console.log('从nodejs返回的数据：', response, 44444)
        }).catch(function (error) {
          console.log('从nodejs返回的数据：', error, 444)
        })
      }
    },
    mounted () {
      this.getDataFromNode()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
