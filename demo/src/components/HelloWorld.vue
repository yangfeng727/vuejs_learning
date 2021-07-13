<template>
  <div class="hello">
    <div class="top">
      横向滚动
      <h-x-scroll :list="scrollList" @change="scChange"/>
    </div>
    <h1>{{ msg }}</h1>
    <h1>vue 国际化配置：{{ msg2 }}</h1>
    <h2>Essential Links</h2>
    <p>测试
      <el-button @click="addObj">点击新增对象属性</el-button>
    </p>
    <p v-if="obj.show">显示。。。。。。。。。。。。。。。。</p>
    <p>文件下载显示案例：<span class="s-file" v-html="$downloadFile('https://fuss10.elemecdn.com/a_ddd.xls')"></span></p>

    <h1>可编辑下拉框</h1>
    <div>
      <edit-select :options="selectMap" :show-empty="false" label="请选择"
                   v-model="selectVal"
                   @change="val => {changSelect(val)}">
      </edit-select>
    </div>

    <h1>自定义指令</h1>
    <div style="margin-bottom: 100px">
      <!--<p>方式一：</p>-->
      <!--<el-input style="width:300px;" v-model="input2" placeholder="请输入内容" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>-->
      <p style="line-height: 30px;">使用封装的input number</p>
      <input-number v-model="input2" style="width:300px;"></input-number>
      <p style="line-height: 30px;">{{input2}}</p>

      <p style="line-height: 30px;">绑定值</p>
      <el-input style="width:300px;" v-number.float="input" v-model="input" placeholder="请输入内容" @input="myChange" clearable></el-input>
      <p style="line-height: 30px;">{{input}}</p>

      <p style="line-height: 30px;">绑定对象赋值</p>
      <el-input style="width:300px;" v-number.float="aaa.bbb.input" v-focus v-model="aaa.bbb.input" placeholder="请输入内容"></el-input>
      <p style="line-height: 30px;">{{aaa.bbb.input}}</p>

      <p style="line-height: 30px;">绑定数组循环的方式赋值</p>
      <template v-for="(item,index) in arr">
        <el-input style="width:300px;" :key="index" v-number.float="`arr-${index}-value`" v-focus v-model="item.value" placeholder="请输入内容"></el-input><br/>
      </template>
      <p style="line-height: 30px;">{{arr[0].value}}</p>
      <p style="line-height: 30px;">{{arr[1].value}}</p>
      <p style="line-height: 30px;">{{arr[2].value}}</p>

      <p style="line-height: 30px;">绑定数组循环,item多级的方式赋值</p>
      <div>
        <template v-for="(item,index) in arr2">
          <el-input style="width:300px;" :key="'dd'+index" v-number:float="`arr2-${index}-a.value`" v-focus v-model="item.a.value" placeholder="请输入内容"></el-input><br/>
        </template>
      </div>

      <p style="line-height: 30px;">{{arr2[0].a.value}}</p>
      <p style="line-height: 30px;">{{arr2[1].a.value}}</p>
      <p style="line-height: 30px;">{{arr2[2].a.value}}</p>
    </div>

  </div>
</template>

<script>
  import $ from 'jQuery'
  import HXScroll from './HXScroll'
  import EditSelect from './pcComponents/EditSelect'
  import InputNumber from './elementUiTest/common/InputNumber'

  export default {
    name: 'HelloWorld',
    components: {
      HXScroll,
      EditSelect,
      InputNumber
    },
    data () {
      return {
        input2:'',
        input:'',
        aaa: {
          bbb: {
            input: '',
          }
        },
        arr:[{value:''},{value:''},{value:''}],
        arr2:[{a:{value:''}},{a:{value:''}},{a:{value:''}}],
        msg: 'Welcome to Your Vue.js App',
        msg2: this.$t('hello'),
        htmlBgColor: '',
        obj: {},
        scrollList: ['eeeee', '1111', '2222', '3333', '4444', 'eeeee', '1111', '2222', '3333', '4444', 'eeeee', '1111', '2222', '3333', '4444', 'eeeee', '1111', '2222', '3333', '4444'],
        // selectMap:{
        //   // 1:'222',
        //   // 2:'44444'
        //   1:{
        //     val:1,
        //     value:'12',
        //     text:'张三1'
        //   },
        //   2:{
        //     val:2,
        //     value:'14',
        //     text:'张三2'
        //   },
        //   3:{
        //     val:3,
        //     value:'12',
        //     text:'张三3'
        //   }
        // },
        selectMap:[
          {value:12,text:'张三1',data:[1,'张三1',2]},
          {value:13,text:'张三2',data:[1,'张三2',2]},
          {value:14,text:'张三3',data:[1,'张三3',2]},
        ],
        //
        // selectMap:[
        //  1,2,3
        // ],
        selectVal:'dddddddd'
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
      scChange (item) {
        console.log(item)
      },
      addObj () {
        // this.obj.show = true
        if ('show' in this.obj) {
          this.obj.show = !this.obj.show
        } else {
          this.$set(this.obj, 'show', true) // 对象用$set新增属性
        }
      },
      changSelect(val){
        console.log(val, 777)
        console.log('selectMap',this.selectMap, 6666)
      },

      myChange(val){
        console.log(val, 888)
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

  .top {
    position: relative;
    background: #ffffff;
    width: 80%;
    margin: 0 auto;
    text-align: left;
    line-height: 50px;
  }
</style>
