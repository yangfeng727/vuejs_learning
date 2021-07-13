<!--折线图组件,左右两边显示坐标轴-->
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
      },
      showTwoAxis: { // 是否显示两根y坐标轴,最后一条数据以右侧坐标为准
        type: Boolean,
        default: false
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
      // 1.无数据时显坐标轴并显示无数据
      // 2.当显示的图形数据大于1条时，最后一条数据显示在右侧坐标轴，左侧无限制
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
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '12%',
            containLabel: true
          },
          xAxis: {
            boundaryGap: false,
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#999999'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eeeeee'
              }
            },
            data: this.chartData.xData
          },
          yAxis: [{
            name: '单位：笔',
            nameTextStyle: {
              color: '#999999'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#999999'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eeeeee'
              }
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
            symbolSize: 6,
            lineStyle: {
              color: thisItem.lineColor[i]
            },
            itemStyle: {
              color: thisItem.lineColor[i]
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: thisItem.lineColor[i] // 0% 处的颜色
                }, {
                  offset: 1, color: '#ffffff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: thisItem.yData[i]
          })
        }

        // 至少两条数据，则最后一条数据指定第二条坐标轴
        if (this.showTwoAxis && this.chartData.name.length > 1 && this.chartData.xData.length) {
          defaultOption.yAxis.push({
            name: '单位：元',
            nameTextStyle: {
              color: '#999999',
              padding: [0, 0, 0, 0]
            },
            position: 'right',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#999999'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#eeeeee'
              }
            }
          })
          defaultOption.series[this.chartData.name.length - 1].yAxisIndex = 1

          // 分割份数的处理，美化显示，统一分割为5份
          try {
            // 左侧坐标轴处理
            let arrLeft = this.chartData.yData.slice(0, this.chartData.name.length - 1)
            arrLeft = arrLeft.join(',').split(',')
            let maxLeft = this.dealMax(Math.max.apply(null, arrLeft))
            let minleft = this.dealMin(Math.min.apply(null, arrLeft))
            defaultOption.yAxis[0].max = maxLeft
            defaultOption.yAxis[0].min = minleft
            defaultOption.yAxis[0].interval = Math.round((maxLeft - minleft) / 5)
            // 右侧坐标轴处理
            let arrRight = this.chartData.yData[this.chartData.yData.length - 1]
            let maxRight = this.dealMax(Math.max.apply(null, arrRight))
            let minRight = this.dealMin(Math.min.apply(null, arrRight))
            defaultOption.yAxis[1].max = maxRight
            defaultOption.yAxis[1].min = minRight
            defaultOption.yAxis[1].interval = Math.round((maxRight - minRight) / 5)
          } catch (e) {}
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
          defaultOption.xAxis.data = ['2019']
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
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    margin-top: -.4rem;
  }
</style>
