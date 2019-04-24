<template>
  <div class="wrap">
    代码测试页面
    <!--<cascade-plug :width="'300px'"></cascade-plug>-->
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
    <div class="wrap-async">
      <h1 class="title">异步调用测试</h1>
      <el-button @click="chainType">ES6 promise 链式测试</el-button>
      <el-button @click="es7Type">ES7 async await 测试</el-button>
    </div>

  </div>
</template>

<script>
// import $ from 'jQuery'
import CascadePlug from '../cascade/CascadePlug'
// import one from '@/assets/Json/one.json'
// import two from '@/assets/Json/two.json'
// import three from '@/assets/Json/three.json'
//
// console.log(one, 1111111)
//
// three.map((item) => {
//
//   two.map(sbu=>{
//     if(sbu.value == item.parent ){
//       !sbu.children && (sbu.children = [])
//
//       sbu.children.push({
//         'label': item.label,
//         'value': item.value
//       })
//     }
//   })
//
//
// })
//
//
// two.map(item=>{
//
//   one.map(svg=>{
//     if(svg.value == item.parent){
//       !svg.children && (svg.children = [])
//
//       svg.children.push({
//         'label': item.label,
//         'value': item.value,
//         children:item.children
//       })
//     }
//   })
//
// })
// console.log(JSON.stringify(
//   one
// ),44)
// import { provinceAndCityData } from 'element-china-area-data'
import CategoryData from '@/assets/Json/CategoryData.json'

import $ from 'jquery'

export default {
  name: 'Page',
  components: {CascadePlug},
  data () {
    return {
      msg: '',
      options: CategoryData,
      selectedOptions: []
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    // es6 promise测试
    chainType () {
      this.asyncFn().then((result) => {
        console.log(result, 111)
        return this.asyncFn()
      }).then((result) => {
        console.log(result, 222)
        return 'promise值 end'
      }).then((result) => {
        console.log(result)
      })
    },
    asyncFn () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('promise值')
        }, 2000)
      })
    },
    // es7 async await测试
    es7Type () {
      function demo1 (arg) {
        return new Promise((resolve, reject) => {
          if (arg) {
            setTimeout(() => {
              console.log('这是demo1', 11)
              resolve()
            }, 2000)
          } else {
            reject(new Error('reject'))
          }
        })
      }
      async function test () {
        await demo1(true) // 等待当前的promise方法执行完成再执行后面的内容
        console.log(222222)
        // let p = await setTimeout(() => { // await后面只有表达式和promise两种
        //   console.log('es7 async await测试', 11)
        // }, 1000)

        async function dd () {
          return new Promise((resolve, reject) => {
            $.ajax({
              type: 'GET',
              url: '/api/jquery/test1.txt',
              success: function (data) {
                console.log('ajax获取成功！！！')
                resolve()
              },
              error: function (jqXHR) {
                console.log('ajax获取失败！！！')
              }
            })
          })
        }
        await dd()
        console.log(1111)
        // return p
      }
      test()
    }
  },
  mounted () {
    // $('body').css('background', '#ccc')
  }
}
</script>

<style scoped>
.wrap-async{
  text-align: left;
  padding: 20px 20px;
}
</style>
