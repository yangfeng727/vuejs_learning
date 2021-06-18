<!--
elementUi的合并相同行table实例
注意事项：1.合并的行数据相同项必须挨在一起，也就是需要合并的行需要紧挨着
-->
<template>
  <div class="wrap">
    <h1>elementUI 表格行合并实例</h1>
    <el-button type="primary" @click="changeData">改变数据</el-button>
    <span-row-table
      :tableData="dealArray(tableData,'id')"
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


    <h2 style="margin-top: 20px;">第二种合并行方法，这个更直观，当然也可以整合到方法一，将合并表格提取出去</h2>
    <p>先将表格数据排列好，提前计算好需要合并行的rosSpan【需要合并的行排列在一起，利用双重循环将需要合并行的rosSpan计算出来，被合并的设置为0】</p>
    <el-table
      :data="setRowSpans(tableData2,'id')"
      :span-method="arraySpanMethod"
      border
      style="width: 100%">
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
        sortable
        label="数值 1">
      </el-table-column>
      <el-table-column
        prop="amount2"
        sortable
        label="数值 2">
      </el-table-column>
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3">
      </el-table-column>
    </el-table>
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
        tableData: [
          {
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3.2',
            amount3: 10
          },
          {
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
        spanRow: ['id', 'name'], // 需要合并的列

        // 第二种实现-优化版
        tableData2: [
          {
            id: '12987122',
            name: '王小虎1',
            amount1: '234',
            amount2: '3.2',
            amount3: 10
          },
          {
            id: '12987124',
            name: '王小虎2',
            amount1: '324',
            amount2: '1.9',
            amount3: 9
          }, {
            id: '12987122',
            name: '王小虎1',
            amount1: '165',
            amount2: '4.43',
            amount3: 12
          }, {
            id: '12987124',
            name: '王小虎2',
            amount1: '621',
            amount2: '2.2',
            amount3: 17
          }, {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4.1',
            amount3: 15
          }]
      }
    },
    methods: {
      /**
       *  处理要合并table 数据，将要合并的行排列在一起
       *  @arr: 要排列的数组
       *  @field: 合并行的统一标准,暂时只支持一个
       * */
      dealArray (arr, field) {
        if (!field) return arr
        let obj = {}
        arr.map(item => {
          obj[item[field]] || (obj[item[field]] = []);
          obj[item[field]].push(item)
        })

        let brr = []
        for (let x in obj) {
          brr = brr.concat(...obj[x])
        }
        return brr
      },

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
      },

      // 方法二

      /**
       * 利用双重循环将需要合并行的rosSpan计算出来，被合并的设置为0
       * @arr 表格数据
       * @field: 合并行的统一标准，暂时只支持一个
       * */
      setRowSpans (arr, field) {
        let cArr = this.dealArray(arr, field);// 先排序
        // 设置rowSpan，后面表格好直接拿来使用，不需要再纠结其他逻辑
        cArr.map(item => {
          item.rowSpan = 1
        })
        for (let i = 0; i < cArr.length; i++) {
          let iItem = cArr[i]

          for (let j = i + 1; j < cArr.length; j++) {
            let j_Item = cArr[j]
            if (iItem[field] === j_Item[field]) {
              iItem.rowSpan++ // 累加

              // 将重复的设置为0，不显示
              j_Item.rowSpan = 0
            }
          }
          // 跳过重复数据
          i = i + iItem.rowSpan - 1
        }
        // console.log(cArr, 555)
        return cArr
      },
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1) { // 数据处理好后这里只考虑哪几列需要合并
          return {
            rowspan: row.rowSpan === undefined ? 0 : row.rowSpan,
            colspan: 1
          }
        }
      },
    },
    created () {
    }
  }
</script>
<style scoped>
  .wrap {
    margin: 20px auto;
    width: 80vw;
  }
</style>
