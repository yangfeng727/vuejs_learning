<!--折线图组件-->
<template>
  <div style="position:relative;">
    <div style="width:100%;height:100%;" :id="id"></div>
    <div v-if="chartData.xData.length===0" class="common-noData">暂无数据</div>
  </div>
</template>
<script>
  // let echarts = require('echarts/lib/echarts') // 引入基本模板
  // require('echarts/lib/chart/line')
  // require('echarts/lib/component/tooltip')
  // require('echarts/lib/component/dataZoom')
  // require('echarts/lib/component/legend')
  // require('echarts/lib/component/title')

  export default {
    name: 'Chart',
    data () {
      return {
        myChart: ''
      }
    },
    props: {
      id: {
        type: String,
        default: 'ChartBox'
      },
      chartData: {
        type: Object,
        default: function () {
          return {
            lineColor: ['#227ed3'],
            name: ['默认值'],
            xData: [], // 横轴值
            yData: [[]] // 纵轴值
          }
        }
      },
      option: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    mounted () {
      this.myChart = this.$echarts.init(document.getElementById(this.id))
      this.showLoading() // 数据获取显示之前先加载一段动画
      this.drawLine()
    },
    methods: {
      /**
       *  显示左右两个y坐标轴时，获取最近的最大值
       * */
      dealMax (max) {
        let multiple = Math.ceil(Math.abs(max)).toString().length - 1 // 去掉小数点和负号
        multiple = Math.pow(10, multiple)
        return Math.ceil(max / multiple) * multiple
      },
      /**
       *  显示左右两个y坐标轴时，获取最近的最小值
       * */
      dealMin (max) {
        let multiple = Math.floor(Math.abs(max)).toString().length - 1
        multiple = Math.pow(10, multiple)
        return Math.floor(max / multiple) * multiple
      },
      // 使用说明：
      // 无数据时显坐标轴并显示无数据
      getOption () {
        let defaultOption = {
          tooltip: {
            confine: true,
            trigger: 'axis',
            backgroundColor: 'rgba(50,50,50,0.5)',
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                color: 'rgba(150,150,150,0.1)'
              }
            },
            formatter: function (param) {
              let str = ''
              param.map((item, index) => {
                str += `<br/>${item.marker + item.seriesName}: ${item.value}`
              })
              return `<div style="text-align: left;">${param[0].axisValue}${str}</div>`
            }
          },
          // dataZoom: {
          //   type: 'inside'
          // },
          legend: {
            show: true,
            data: this.chartData.name
          },
          grid: {
            left: '0d%',
            right: '3%',
            top: '5%',
            bottom: '12%',
            containLabel: true
          },
          xAxis: [
            {
              position: 'top',
              boundaryGap: false,
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                color: '#666666',
                margin: 30
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#DCDCDC',
                  type: 'dashed'
                }
              },
              data: this.chartData.xData
            },
            {
              // 坐标圆点样式,利用文字块显示
              position: 'top',
              boundaryGap: false,
              type: 'category',
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel: {
                formatter: function () {
                  return ''
                },
                margin: 5,
                backgroundColor: '#69ADF5',
                borderRadius: 10,
                padding: [5, 5, 5, 5]
              },
              splitLine: {show: false},
              data: this.chartData.xData
            }
          ],
          yAxis: [{
            nameTextStyle: {
              color: '#666666'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#666666',
              'margin': 50,
              formatter: function (value, index) {
                return value + '名'
              }
            },
            splitLine: {
              show: false
            }
          }],
          series: []
        }
        // 赋值series
        for (let i = 0; i < this.chartData.name.length; i++) {
          let thisItem = this.chartData
          defaultOption.series.push({
            name: thisItem.name[i],
            type: 'line',
            smooth: true,
            symbolSize: 6,
            lineStyle: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: thisItem.lineColor[i][0] // 0% 处的颜色
                }, {
                  offset: 1, color: thisItem.lineColor[i][1] // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              shadowColor: 'rgba(98,197,252,0.8)',
              shadowBlur: 10,
              shadowOffsetY: 10
            },
            itemStyle: {
              color: thisItem.lineColor[i][0]
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(150,217,253,0.1)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#ffffff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: thisItem.yData[i]
          })
        }

        // 传入的option只支持第一层的合并
        if (JSON.stringify(this.option) !== '{}') {
          for (let x in defaultOption) {
            if (this.option[x]) {
              Object.assign(defaultOption[x], this.option[x])
            }
          }
        }
        // 无数据时的处理,显示坐标轴
        if (this.chartData.xData.length === 0) {
          defaultOption.xAxis.data = ['无数据']
          defaultOption.tooltip.show = false
          for (let i = 0; i < this.chartData.name.length; i++) {
            defaultOption.series[i].data = [0]
          }
        }
        return defaultOption
      },
      drawLine () { // 绘制图表
        this.hideLoading()
        this.myChart.clear()
        this.resetChartData()
      },
      resetChartData () { // 刷新数据
        this.myChart.setOption(this.getOption(), true)
        this.hideLoading()
      },
      showLoading () { // 显示加载动画
        this.myChart.showLoading()
      },
      hideLoading () { // 关闭加载动画
        this.myChart.hideLoading()
      }
    },
    watch: {
      chartData: function (value) {
        this.resetChartData()
      }
    },
    beforeDestroy () {
      this.myChart && this.myChart.dispose()
    }
  }
</script>
<style scoped>
  .common-noData {
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    margin-top: -.4rem;
  }
</style>
