<!--
elementUi的合并相同行table实例
注意事项：1.合并行的id必须相同
          2.合并的行数据相同项必须紧紧挨在一起
-->
<template>
  <div class="eTable-wrap">
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border>
      <!--表头-->
      <slot name="tableColumn"></slot>
      <!--示例如注释部分-->
      <!--<el-table-column-->
      <!--prop="id"-->
      <!--label="ID"-->
      <!--width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="name"-->
      <!--label="姓名">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="amount1"-->
      <!--label="数值 1（元）">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="amount2"-->
      <!--label="数值 2（元）">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop="amount3"-->
      <!--label="数值 3（元）">-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
  // 必须的全局变量，存储当前正在合并行的信息
  let keyWord = {
    id: '',
    rowIndex: -1
  }
  let lObj = {} // 记录列表当前行的跨行数
  export default {
    props: {
      tableData: { // 表格数据
        type: Array,
        default () {
          return []
        }
      },
      spanRow: { // 需要合并的列
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {}
    },
    watch: {
      tableData (newVal, oldVal) {
        this.variableReset(newVal)
      }
    },
    methods: {
      /**
       *  数据变量重置
       * */
      variableReset (list) {
        keyWord = {
          id: '',
          rowIndex: -1
        }
        lObj = {}
        this.dataDeal(list)
      },
      /**
       *  数据处理，存储当前行需要渲染的跨行数
       * */
      dataDeal (list) {
        lObj = {}
        list.map((item) => {
          if (lObj[item.id]) {
            lObj[item.id] = lObj[item.id] + 1
          } else {
            lObj[item.id] = 1 // 当前id的渲染次数
          }
        })
        // console.log(this.lObj, 444)
      },
      objectSpanMethod ({row, column, rowIndex, columnIndex}) {
        // 注意点：跨行的td，下一行当前位置不予渲染，return [0, 0]
        if (this.spanRow.indexOf(column.property) > -1) {
          // console.log(row, column, rowIndex, columnIndex, column.property)
          if (keyWord.id !== row.id || keyWord.rowIndex === rowIndex) { // 当前行第一次出现，合并行只能第一行设置跨行，后面几行的单元格不渲染
            keyWord = { // 记录当前行的id和rowIndex
              id: row.id,
              rowIndex
            }
            return [lObj[row.id], 1]
          } else { // 这是需要合并行的下面几行，id相同，但是不能渲染
            return [0, 0]
          }
        } else {
          return [1, 1]
        }
      }
    },
    created () {
      this.variableReset(this.tableData)
    }
  }
</script>
<style scoped>
  .eTable-wrap {
    width: 100%;
  }
</style>
