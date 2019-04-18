<template>
  <div class="test">
    <h1 class="title">{{msg}}</h1>
    <div class="testStore-wrap">
      <!--获取state-->
      <p>这是一般取值：<span class="col-color">{{$store.state.modulesA.msg}}</span></p>
      <p>这是使用mapState取值：<span class="col-color">{{msgFromModuleA}}</span></p>

      <!--获取getters-->
      <p>这是使用getter里面的方法，一般取值：<span class="col-color">{{$store.getters['modulesA/aMget']}}</span></p>
      <p>这是使用getter里面的方法，使用mapGetters取值：<span class="col-color">{{aMgetFromModuleA}}</span></p>

      <!--mutations和actions-->
      <el-input v-model="value" style="width:200px"/>
      <el-button type="primary" @click="minusPriceFromModuleA(value)">改变store值-同步-【mutations方式】</el-button>
      <el-button type="primary" @click="minusPriceAsyncFromModuleA(value)">改变store值-异步-【actions方式】</el-button>
      <el-button type="primary" @click="showMsg(value)">返回promise【actions方式】</el-button>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'TestStoreModule',
  data () {
    return {
      msg: '调试store vuex-module 基础用法',
      value: ''
    }
  },
  methods: {
    ...mapMutations('modulesA', {
      minusPriceFromModuleA: 'minusPrice'
    }), // store里面的同步方法
    ...mapActions('modulesA', {
      minusPriceAsyncFromModuleA: 'minusPriceAsync'
    }), // store里面的异步方法
    showMsg (val) {
      this.minusPriceAsyncFromModuleA(val).then(() => {
        alert('这是action返回的promise')
      })
    }
  },
  computed: {
    ...mapState('modulesA', {
      msgFromModuleA: state => state.msg // 将store里面的 products映射为productsA
    }), // store里面的state
    ...mapGetters('modulesA', {
      aMgetFromModuleA: 'aMget'
    }) // store里面的getter 类似于computed
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .testStore-wrap {
    text-align: left;
    padding: 20px 50px;

    .col-color {
      background: #35b3ee;
    }

    p {
      padding-bottom: 5px;
    }
  }
</style>
