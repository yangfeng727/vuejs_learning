<template>
  <div class="wrap">
    <h1 style="width: 100%;">echarts 换肤</h1>
    <div style="width:100%;display: flex;justify-content: space-between;align-items: flex-start;">
      <!--换皮肤前-->
      <div class="com-box">
        <h1>换肤前</h1>
        <div class="line-chart" id="testTheme1"></div>
      </div>
      <!--换皮肤后-->
      <div class="com-box">
        <h1>换肤后</h1>
        <div class="line-chart" id="testTheme2"></div>
      </div>
    </div>

    <!--双轴分割折线图-->
    <div class="com-box">
      <h1>双轴分割折线图<span class="note">(两根轴的量度单位不同)</span></h1>
      <x-y-line-chart :chart-data='lineChart.chartData' :showTwoAxis="true" class="line-chart" id="line-chart"/>
    </div>

    <!--横坐标带点的折线图-->
    <div class="com-box">
      <h1>横坐标带点的折线图</h1>
      <Chart :chart-data='chart.chartData' :option="chart.option" class="line-chart" id="line-chart1"/>
    </div>

    <!--多柱柱状图-->
    <div class="com-box">
      <h1>多柱柱状图</h1>
      <bar-chart :chart-data='barChart.chartData' class="line-chart" id="line-chart2"/>
    </div>

    <!--关系图-->
    <div class="com-box" style="width:100%;">
      <h1>高亮切换显示关系图</h1>
      <ul class="text-title">
        <li v-for="(item,index) in menuList" :key="index" :class="{'on':selected==index}"
            @click="changeHignLightLabel(item)">{{item.label}}
        </li>
      </ul>
      <div style="height: 500px;">
        <charts-chain-graph class="line-chart" id="graph-charts" :hignLightLabel="hignLightLabel"/>
      </div>
    </div>

  </div>
</template>

<script>
  import Chart from './common/Chart'
  import BarChart from './common/BarChart'
  import XYLineChart from './common/XYLineChart'
  import ChartsChainGraph from './common/ChartsChainGraph'

  export default {
    name: 'eharts',
    components: {
      Chart,
      BarChart,
      XYLineChart,
      ChartsChainGraph
    },
    data () {
      return {
        lineChart: {
          chartData: {
            lineColor: ['#f1c00a', '#227ed3'],
            name: ['交易笔数', '交易金额'],
            xData: ['2015', '2016', '2017', '2018', '2019'], // 横轴值
            yData: [[20, 80, 99, 68, 105], [260, 500, 1005, 200, 1600]]
          }
        },
        chart: {
          chartData: {
            lineColor: [['#96A7FD', '#62C5FC']], // 线的渐变色
            name: ['当日额度统计'],
            xData: ['00:00-02:00', '02:00-04:00', '04:00-06:00', '06:00-08:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00', '22:00-00:00'], // 横轴值
            yData: [[20, 80, 99, 68, 105, 50, 100, 140, 60, 129, 190, 180]] // 纵轴值
          },
          option: {
            legend: {
              show: false
            }
          }
        },
        barChart: {
          chartData: {
            lineColor: [['#fccb05', '#f5804d'], ['#8bd46e', '#09bcb7'], ['#248ff7', '#6851f1'], ['#FF1842', '#FF4804']], // 柱子的渐变色
            name: ['充值', '转账', '换汇', '提现'],
            xData: ['2015', '2016', '2017', '2018', '2019'], // 横轴值
            yData: [[20, 80, 99, 68, 105], [20, 80, 99, 68, 105], [20, 80, 99, 68, 105], [-60, 80, 99, 68, 105]] // 纵轴值
          }
        },
        // 关系图
        selected: 0,
        menuList: [
          {
            label: '全部',
            node: ''
          },
          {
            label: '易保全',
            node: '易保全'
          },
          {
            label: '仲裁委',
            node: '仲裁委'
          },
          {
            label: '公证处',
            node: '公证处'
          }
        ],
        hignLightLabel: ''
      }
    },
    methods: {
      changeHignLightLabel (item) {
        this.hignLightLabel = item.node
      },
      getMyOption () {
        return {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }, {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }, {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        }
      }
    },
    mounted () {
      // 使用注册了主题的echarts全局变量
      this.$echarts.init(document.getElementById('testTheme1')).setOption(this.getMyOption())
      this.$echarts.init(document.getElementById('testTheme2'),'mytest-theme').setOption(this.getMyOption())
    }
  }
</script>

<style scoped lang="less">
  .wrap {
    background: #f8f8f8;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    /*flex-direction: ;*/
    flex-wrap: wrap;
    align-items: center;
  }

  .line-chart {
    width: 100%;
    height: 330px;
  }

  .com-box {
    margin: 60px;
    width: 800px;
    background: rgba(255, 255, 255, 1);
    box-shadow: -.02rem .07rem .15rem 1px rgba(203, 204, 204, 0.18);
    border-radius: .03rem;
    /*margin: 20px auto;*/
    box-sizing: border-box;
    padding: 15px 60px;
  }

  .note {
    font-size: 18px;
  }

  .text-title {
    list-style: none;
    display: inline-block;
    margin: 10px 0;
    li {
      list-style: none;
      font-size: 14px;
      text-align: center;
      line-height: 50px;
      width: 200px;
      padding: 0 5px;
      cursor: pointer;
      display: inline-block;
      margin-right: 10px;
      color: #ffffff;
      background: #46A4FF;
      &:hover, &.on {
        color: #ff6d6d;
      }
    }
  }
</style>
