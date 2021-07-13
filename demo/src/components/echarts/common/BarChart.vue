<!--折线图组件-->
<template>
  <div style="position:relative;">
    <div style="width:100%;height:100%;" :id="id"></div>
    <div v-if="chartData.xData.length===0" class="common-noData">暂无数据</div>
  </div>
</template>
<script>
  // let echarts = require('echarts/lib/echarts') // 引入基本模板
  // require('echarts/lib/chart/bar')
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
              // console.log(param)
              let str = ''
              param.map((item, index) => {
                // str += `<br/>${item.marker + item.seriesName}: ${item.value}`
                let color = '' // 当前颜色，不使用item.marker的原因，当设置渐变时，颜色为对象，显示错误，这里重写
                if (typeof (item.color) === 'string') {
                  color = item.color
                } else {
                  color = item.color.colorStops[0].color
                }
                str += `<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>${item.seriesName}: ${item.value}`
              })
              return `<div style="text-align: left;">${param[0].axisValue}${str}</div>`
            }
          },
          dataZoom: {
            type: 'slider',
            bottom: 0
            // backgroundColor: 'rgba(210,100,10,0.2)',
            // dataBackground: {
            //   lineStyle: {
            //     // color: 'red'
            //   },
            //   areaStyle: {
            //     color: 'rgba(10,237,255,0.8)'
            //   }
            // },
            // fillerColor: 'rgba(104,255,7,0.5)'
          },
          legend: {
            show: true,
            data: this.chartData.name,
            top: '3%'
          },
          grid: {
            left: '3%',
            right: '5%',
            top: '18%',
            bottom: '16%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#DCDCDC'
                }
              },
              axisLabel: {
                color: '#666666',
                margin: 10
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#DCDCDC',
                  type: 'dashed'
                }
              },
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
              show: true,
              lineStyle: {
                color: '#DCDCDC'
              }
            },
            axisLabel: {
              color: '#666666',
              'margin': 10
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DCDCDC',
                type: 'dashed'
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
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: thisItem.lineColor[i][0]
              }, {
                offset: 1,
                color: thisItem.lineColor[i][1]
              }]),
              barBorderRadius: 11
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
