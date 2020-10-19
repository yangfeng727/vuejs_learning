<!--关系图组件-->
<!--author:yf-->
<template>
  <div style="position:relative;width: 100%;height: 100%;">
    <div style="width:100%;height:100%;" :id="id"></div>
    <div v-if="chartData.length===0" class="common-noData">暂无数据</div>
  </div>
</template>
<script>
  let echarts = require('echarts/lib/echarts'); // 引入基本模板
  require('echarts/lib/chart/graph');
  require('echarts/lib/component/tooltip');
  // require('echarts/lib/component/dataZoom');
  // require('echarts/lib/component/legend');
  // require('echarts/lib/component/title')

  const merge = require('webpack-merge');

  export default {
    name: 'Chart',
    data() {
      return {
        myChart: '',
        dataObj: {
          categories: [],
          data: [],
          link: [],
        },
      };
    },
    props: {
      id: { // 分配渲染的盒子id
        type: String,
        default: 'ChartBox',
      },
      chartData: { // 渲染的节点数据及节点颜色
        type: Array,
        default: function() {
          return [
            {
              label: '保全链',
              level: 1,
              color: ['#010D71', '#0B36FB'],
              children: [
                {
                  label: '易保全',
                  level: 2,
                  color: ['#102EB5', '#3E61FF'],
                  children: [
                    {
                      label: '重庆易保全网络科技有限公司',
                      level: 3,
                    },
                  ],
                },
                {
                  label: '仲裁委',
                  level: 2,
                  color: ['#1C174A', '#00B0FD'],
                  children: [
                    {
                      label: '深汕仲裁委',
                      level: 3,
                      labelOffset: [-25, -25],
                    },
                    {
                      label: '十堰仲裁委',
                      level: 3,
                    },
                    {
                      label: '赣国仲裁委',
                      level: 3,
                    },
                    {
                      label: '广州仲裁委',
                      level: 3,
                    },
                    {
                      label: '珠海仲裁委',
                      level: 3,
                    },
                    {
                      label: '盐城仲裁委',
                      level: 3,
                      labelPosition: 'right', // 方向
                      labelOffset: [-20, 25],
                    },
                    {
                      label: '安阳仲裁委',
                      level: 3,
                      labelPosition: 'left', // 方向
                      labelOffset: [20, 25],
                    },
                    {
                      label: '宁波仲裁委',
                      level: 3,
                      labelPosition: 'left', // 方向
                    },
                    {
                      label: '中卫仲裁委',
                      level: 3,
                      labelPosition: 'left', // 方向
                    },
                    {
                      label: '青岛仲裁委',
                      level: 3,
                      labelPosition: 'left', // 方向
                    },
                    {
                      label: '哈尔滨仲裁委',
                      level: 3,
                      labelPosition: 'left', // 方向
                    },
                    {
                      label: '庆阳仲裁委',
                      level: 3,
                      labelPosition: 'left', // 方向
                    },
                    {
                      label: '台州仲裁委',
                      level: 3,
                      labelPosition: 'left', // 方向
                      labelOffset: [15, -25],
                    },
                  ],
                },
                {
                  label: '版权\n机构',
                  level: 2,
                  color: ['#651A15', '#D67973'],
                  children: [
                    {
                      label: '首都知识产权局',
                      level: 3,
                      labelPosition: 'left', // 方向
                    },
                    {
                      label: '重庆市版权保护中心',
                      level: 3,
                      labelPosition: 'left', // 方向
                      labelOffset: [10, -20],
                    },
                    {
                      label: '贵州省版权局登记平台',
                      level: 3,
                      labelOffset: [-10, -20],
                    },
                  ],
                },
                {
                  label: '公证处',
                  level: 2,
                  color: ['#013426', '#11CB8F'],
                  children: [
                    {
                      label: '山西太原市城南公证处',
                      level: 3,
                    },
                    {
                      label: '重庆市渝信公证处',
                      level: 3,
                    },
                  ],
                },
                {
                  label: '互联网\n法院',
                  level: 2,
                  color: ['#2A019A', '#6E3AFB'],
                  children: [
                    {
                      label: '广州互联网法院',
                      level: 3,
                    },
                  ],
                },
              ],
            },
          ];
        },
      },
      option: {
        type: Object,
        default: function() {
          return {};
        },
      },
      hignLightLabel: { // 默认高亮的节点label
        type: String,
        default: '',
      },
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById(this.id));
      this.showLoading(); // 数据获取显示之前先加载一段动画
      this.draw();

      // 高亮某个节点
      this.hignLightLabel && this.highLight();
      let _this = this;
      this.myChart.on('mouseout', function(e) {
        _this.highLight();
      });
    },
    methods: {
      /**
       *  组装图表需要的数据数据
       *  return {
          categories: [],
          data: [],
          link: [],
        }
       * */
      packageData() {

        let chartData = this.chartData;
        let dataObj = {
          categories: [],
          data: [],
          link: [],
        };

        // 获取随机数
        let getRandomNum = function(min, max) {
          max = max + 1;
          return Math.floor(Math.random() * (max - min) + min);
        };

        // 构造渲染数据
        let dgFn = function(preNode, list) {

          list.map((item, index) => {
            let currentLevelName = item.level + '级节点'; // 当前节点级别
            let color = item.color ? item.color : preNode.color;
            let label = item.label;

            switch (+item.level) {
              // 一级节点渲染
              case 1:
                // code
                // categories
                if (dataObj.categories.findIndex(sub => sub.name == currentLevelName) == -1) {
                  dataObj.categories.push({
                    name: currentLevelName,
                    label: {
                      show: true,
                      position: 'inside',
                      fontSize: 14,
                    },
                    // symbolSize: 78,
                    itemStyle: {
                      borderWidth: 4,
                      borderColor: color[0],
                      shadowColor: color[1],
                      shadowBlur: 8,
                      color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                          {
                            offset: 0,
                            color: color[0], // 0% 处的颜色
                          },
                          {
                            offset: 0.4,
                            color: color[0], // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: color[1], // 100% 处的颜色
                          },
                        ],
                        global: false,
                      },
                    },
                  });
                }

                // data
                dataObj.data.push({
                  name: label,
                  // value:30,
                  category: dataObj.categories.findIndex(sub => sub.name == currentLevelName),
                  fixed: false,
                  symbolSize: 78,
                });

                // link
                // dataObj.link.push({
                //   source: '根节点',
                //   target: '节点1',
                //   lineStyle: {
                //     color: color[i],
                //   },
                //   // value:10000
                // });

                break;

              // 二级节点渲染
              case 2:
                // code
                // categories
                if (dataObj.categories.findIndex(sub => sub.name == currentLevelName) == -1) {
                  dataObj.categories.push({
                    name: currentLevelName,
                    // symbolSize: 66,
                    label: {
                      show: true,
                      position: 'inside',
                      fontSize: 14,
                      color: '#ffffff',
                    },
                  });
                }

                // data
                dataObj.data.push({
                  name: label,
                  // value:10*i,
                  category: dataObj.categories.findIndex(sub => sub.name == currentLevelName),
                  fixed: false,
                  symbolSize: 60,
                  itemStyle: {
                    borderWidth: 4,
                    borderColor: color[1],
                    shadowColor: color[1],
                    shadowBlur: 15,
                    color: {
                      type: 'radial',
                      x: 0.5,
                      y: 0.5,
                      r: 0.5,
                      colorStops: [
                        {
                          offset: 0,
                          color: color[0], // 0% 处的颜色
                        },
                        // {
                        //     offset: 0.6,
                        //     color:  color[0] // 0% 处的颜色
                        // },
                        {
                          offset: 1,
                          color: color[1], // 100% 处的颜色
                        },
                      ],
                      global: false,
                    },
                  },
                });

                // link
                preNode && dataObj.link.push({
                  source: preNode.label,
                  target: label,
                  lineStyle: {
                    color: color[1],
                  },
                  // value:10000
                });
                break;

              // 三级节点渲染
              case 3:
                // code
                // categories
                if (dataObj.categories.findIndex(sub => sub.name == currentLevelName) == -1) {
                  dataObj.categories.push({
                    name: currentLevelName,
                    label: {
                      show: true,
                      position: 'right',
                      backgroundColor: '#3B3894',
                      padding: [8, 10],
                      borderRadius: 100,
                      offset: [-5, 0],
                      color: '#00B0FD',
                    },
                    //   symbol:'none',
                    symbolSize: 10,
                    //   symbolOffset:[15,0],
                    itemStyle: {
                      color: '#00B0FD',
                    },
                  });
                }

                // let randNum = getRandomNum(0, 1);
                // if (randNum != 2) {
                //   randNum = getRandomNum(0, 1);
                // }
                dataObj.data.push({
                  name: label,
                  category: dataObj.categories.findIndex(sub => sub.name == currentLevelName),
                  label: {
                    color: color[1],
                    position: item.labelPosition ? item.labelPosition : 'right', // left,top,bottom,right,三级节点可配置label方向
                    offset: item.labelOffset ? item.labelOffset : [0, 0],
                  },
                  itemStyle: {
                    color: color[1],
                  },
                });

                // link
                preNode && dataObj.link.push({
                  source: preNode.label,
                  target: label,
                  lineStyle: {
                    color: color[1],
                  },
                  // value:10000
                });
                break;

              default:
              // code
            }

            if (item.children && item.children.length > 0) {
              dgFn(item, item.children);
            }
          });

        };

        dgFn('', chartData);

        return dataObj;
      },
      // 使用说明：
      // 无数据时显坐标轴并显示无数据
      getOption() {
        let dataObj = this.packageData();
        this.dataObj = dataObj; // 存储数控
        let defaultOption = {
          backgroundColor: '#1C174A',
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right',
          },
          // tooltip: {},
          // legend: [{
          //     // selectedMode: 'single',
          //     data: categories.map(function (a) {
          //         return a.name;
          //     })
          // }],
          // animation: false,
          // animationDuration: 1500,
          // animationEasingUpdate: "quinticInOut",
          series: [
            {
              // zoom:1,
              name: '关系图',
              draggable: true,
              edgeSymbol: ['none', 'arrow'],
              type: 'graph',
              layout: 'force',
              data: dataObj.data,
              links: dataObj.link,
              hoverAnimation: true,
              categories: dataObj.categories,
              roam: true,
              focusNodeAdjacency: true,
              label: {
                position: 'right',
              },
              force: {
                initLayout: 'circular',
                repulsion: 240,
                edgeLength: 100,
              },

            },
          ],
        };
        if (Object.keys(this.option).length) {
          defaultOption = merge(defaultOption, this.option);
        }
        return defaultOption;
      },
      draw() { // 绘制图表
        this.hideLoading();
        this.myChart.clear();
        this.resetChartData();
      },
      resetChartData() { // 刷新数据
        this.myChart.setOption(this.getOption(), true);
        this.hideLoading();
      },
      showLoading() { // 显示加载动画
        this.myChart.showLoading();
      },
      hideLoading() { // 关闭加载动画
        this.myChart.hideLoading();
      },
      // 高亮节点
      highLight() {
        if (this.hignLightLabel) {
          let findIndex = this.dataObj.data.findIndex(item => item.name === this.hignLightLabel);
          findIndex > -1 && this.myChart.dispatchAction({
            type: 'focusNodeAdjacency',
            // 使用 seriesId 或 seriesIndex 或 seriesName 来指定 series.
            // seriesId: 'xxx',
            // seriesIndex: 0,
            // seriesName: '2级节点',
            // 使用 dataIndex 来指定目标节点，或者使用 edgeDataIndex 来指定目标边。
            dataIndex: findIndex,
            // edgeDataIndex: 5
          });
        } else {
          this.cancelHighLight();
        }
      },
      // 取消高亮
      cancelHighLight() {
        this.myChart.dispatchAction({
          type: 'unfocusNodeAdjacency',
// 使用 seriesId 或 seriesIndex 或 seriesName 来定位 series.
//           seriesId: 'xxx',
//           seriesIndex: 0,
//           seriesName: 'nnn'
        });
      },
    },
    watch: {
      chartData: function(value) {
        this.resetChartData();
      },
      hignLightLabel(newVal) {
        this.highLight();
      },
    },
    beforeDestroy() {
      this.myChart && this.myChart.dispose();
    },
  };
</script>
<style scoped>
  .common-noData {
    color: #ffffff;
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    margin-top: -10px;
  }
</style>
