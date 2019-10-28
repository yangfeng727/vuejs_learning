<!--
elementUi的合并相同行table实例
注意事项：1.合并的行数据相同项必须挨在一起，也就是需要合并的行需要紧挨着
-->
<template>
  <div class="wrap">
    <h1>elementUI 表格行合并实例</h1>
    <el-button type="primary" @click="changeData">改变数据</el-button>
    <span-row-table
      :tableData="tableData"
      :spanRow="spanRow"
    >
      <template slot="tableColumn">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="amount1"
          label="数值 1（元）">
        </el-table-column>
        <el-table-column
          prop="amount2"
          label="数值 2（元）">
        </el-table-column>
        <el-table-column
          prop="amount3"
          label="数值 3（元）">
        </el-table-column>
      </template>
    </span-row-table>
  </div>
</template>

<script>
  import SpanRowTable from './common/SpanRowTable'

  export default {
    components: {
      SpanRowTable
    },
    data () {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987122',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '小云',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987125',
          name: '王虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          id: '12987129',
          name: '小红',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
        spanRow: ['id', 'name'] // 需要合并的列
      }
    },
    methods: {
      // 更改数据
      changeData () {
        this.tableData = [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 144
        }, {
          id: '12987122',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '小云',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王发虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987125',
          name: '王发虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          id: '12987129',
          name: '小小',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      }
    },
    created () {
    }
  }
</script>
<style scoped>
  .wrap {
    margin: 20px auto;
    width: 800px;
  }
</style>
