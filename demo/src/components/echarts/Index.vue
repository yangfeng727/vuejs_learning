<template>
  <div class="wrap">
    <!--当日额度统计-->
    <div class="com-box">
      <h1>横坐标带点的折线图</h1>
      <Chart :chart-data='chart.chartData' :option="chart.option" class="line-chart" id="line-chart"/>
    </div>

    <!--多类型图-->
    <div class="com-box">
      <h1>多柱柱状图</h1>
      <bar-chart :chart-data='barChart.chartData' class="line-chart" id="line-chart2"/>
    </div>
  </div>
</template>

<script>
  import Chart from './common/Chart'
  import BarChart from './common/BarChart'

  export default {
    name: 'eharts',
    components: {
      Chart,
      BarChart
    },
    data () {
      return {
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
        }
      }
    }
  }
</script>

<style>
  .wrap {
    background: #f8f8f8;
    overflow: hidden;
  }

  .line-chart {
    width: 100%;
    height: 330px;
  }

  .com-box {
    width: 800px;
    background: rgba(255, 255, 255, 1);
    box-shadow: -.02rem .07rem .15rem 1px rgba(203, 204, 204, 0.18);
    border-radius: .03rem;
    margin: 20px auto;
    box-sizing: border-box;
    padding: 15px 60px;
  }
</style>
