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
    }
  },
  mounted () {
    // $('body').css('background', '#ccc')
  }
}
</script>

<style scoped>

</style>
