<template>
  <div class="test">
    <h1 class="title">{{msg}}</h1>
    <div class="testStore-wrap">
      <div class="box-one">
        <p class="p-title">原始列表</p>
        <ul>
          <li v-for="(item,index) in products" :key="index">{{item.name}} <span>{{item.price}}元</span></li>
        </ul>
      </div>

      <div class="box-one">
        <p class="p-title">getters里的列表</p>
        <ul>
          <li v-for="(item,index) in saleProducts" :key="index">{{item.name}} <span>{{item.price}}元</span>
          </li>
        </ul>
      </div>

      <el-input v-model="valPrice" style="width:200px"/>
      <el-button @click="minusPrice(valPrice)">改变store值-同步-【mutations方式】</el-button>
      <el-button @click="minusPriceAsync(valPrice)">改变store值-异步-【actions方式】</el-button>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'TestStore',
  data () {
    return {
      msg: '调试store 统一状态管理',
      valPrice: ''
    }
  },
  methods: {
    ...mapMutations(['minusPrice']), // store里面的同步方法
    ...mapActions(['minusPriceAsync']) // store里面的异步方法
  },
  computed: {
    // ...mapState({
    //   productsA: 'products' // 将store里面的 products映射为productsA
    // }), // store里面的state
    ...mapState(['products']), // store里面的state
    ...mapGetters(['saleProducts']) // store里面的getter 类似于computed
  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
  ul {
    overflow: hidden;
    float: left;
  }

  li, ul {
    list-style: none;
  }

  li {
    margin-bottom: 2px;
    border: 1px solid #ccc;
    color: #f1f8ff;
    background: #24d291;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 5px;
  }

  .testStore-wrap {
    .box-one {
      margin-left: 50px;
      float: left;

      .p-title {
        text-align: left;
        padding: 5px;
      }

      &:nth-child(2n+1) {
        li {
          background: #8dd209;
        }
      }
    }
  }
</style>
