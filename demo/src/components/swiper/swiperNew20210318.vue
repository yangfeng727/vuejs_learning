<!--轮播组件,根据父级别宽度渲染,需要父级设置overflow:hidden-->
<!--author:yf-->
<!--zoom（缩放）:两边小中间大的轮播展示效果,想要更改两边的距离,请配置options.bSidesWidth值-->
<!--normal（普通轮播-->
<template>
  <div class="swiper-component" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
       :style="{height:height,width:width}">
    <ul :style="[ulStyle, swiperStyle]">
      <li v-for="(item, ind) in list" :key="ind" :style="{width: itemWidth + 'px'}"
          :class="[index===ind?'active':'', effect]" @click="handleClick(item)">
        <div :style="{background: bgColor}">
          <slot name="list" :item="item">{{item}}</slot>
        </div>
      </li>
    </ul>
    <div v-show="options.showDots" class="swiper-dots">
      <div v-for="(item, ind) in list" :key="ind" class="dots-item" :class="{active:index===ind}"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      bgColor: { // li bg color
        type: String,
        default: '#ffbdd4'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '3rem'
      },
      options: { // 配置
        type: Object,
        default() {
          return {
            bSidesWidth: 30, // effect为zoom时两侧空隙的单边距离
            showDots: false, // 是否显示分页器
            interval: 3000, // 轮播间隔时间，默认3s
            autoplay: false, // 是否自动播放
            // loop: false // 是否循环轮播
          }
        }
      },
      list: {
        type: Array,
        default() {
          return []
        }
      },
      effect: {
        type: String,
        default: 'normal' // 轮播图的样式类型，默认正常类型 normal，可选：zoom（缩放）
      }
    },
    data() {
      return {
        ulStyle: {width: 0, paddingLeft: 0}, // 轮播图容器宽度
        itemWidth: 0, // 单个轮播图容器的宽度,
        swiperStyle: {}, // 控制轮播的样式
        index: 0, // 当前显示的轮播图索引，默认第一张
        touchStart: {}, // 触摸开始点位
        touchEnd: {}, // 触摸结束点位
        intervalTime: '' // 循环轮播定时器
      }
    },
    watch: {
      list: function (e) {
        this.calcWidth()
      },
      'options.autoplay'(newVal, oldVal) {
        if (newVal) {
          this.handleLoopMove()
        } else {
          this.clearTimer()
          // this.$emit('stopInterval', true) // 轮播停止
        }
      }
    },
    methods: {
      /**
       * 初始化时的一些宽度计算操作
       */
      calcWidth() {
        // 页面更新后执行宽度计算
        this.$nextTick(() => {
          // if (this.effect === 'normal') {
          //   // 如果是正常模式，一张图的宽度为屏幕宽度
          //   this.itemWidth = document.body.clientWidth // 获取屏幕的宽度
          // } else if (this.effect === 'zoom') {
          //   // 如果是缩放模式，控制轮播图显示的宽度，两边流出空隙
          //   this.itemWidth = document.body.clientWidth - this.bSidesWidth * 2 // 获取屏幕的宽度
          // }

          let componentWidth = parseInt(this.$el.clientWidth)// 组件宽
          if (this.effect === 'normal') {
            this.itemWidth = componentWidth
          } else {
            this.itemWidth = componentWidth - this.options.bSidesWidth * 2
          }
          this.handleType()
          // let length = this.list.length // 获取列表的个数
          // this.ulStyle.width = parseInt((this.itemWidth + this.bSidesWidth * 2) * length) + 'px' // 容器总宽度
          this.ulStyle.width = componentWidth + 'px' // 容器总宽度
        })
      },
      /**
       * 轮播图点击事件
       */
      handleClick(val) {
        // 触发外部事件，将点击的轮播图详情数据返回
        this.$emit('onClick', val)
      },
      /**
       * 判断轮播类型，根据类型执行对应的操作
       */
      handleType() {
        if (this.effect === 'normal') {
          this.ulStyle.paddingLeft = 0 // 将起始位置左侧的padding置为0
        } else if (this.effect === 'zoom' && this.index === 0) {
          this.ulStyle.paddingLeft = this.options.bSidesWidth + 'px' // 保证左侧有一定的位移
        }
      },
      /**
       * 移动处理
       *
       */
      handleMove() {
        let moveX = this.itemWidth * this.index
        if (this.index === 0) {
          moveX = 0
          this.handleType()
        } else {
          this.ulStyle.paddingLeft = 0 // 将起始位置左侧的padding置为0
          if (this.effect === 'zoom') {
            moveX = moveX - this.options.bSidesWidth
          }
        }
        this.swiperStyle = {
          transform: 'translateX(-' + moveX + 'px)'
        }
      },
      /**
       * 循环移动处理
       */
      handleLoopMove() {
        this.clearTimer()
        // 当设置自动播放时，执行自动循环播放操作，否则，只执行下一次轮播效果
        if (this.options.autoplay) {
          let interval = this.options.interval ? this.options.interval : 3000
          this.intervalTime = setInterval(() => {
            this.index++
            if (this.index > this.list.length - 1) {
              this.index = 0 // 置为-1,下次轮播时index就会变成0，图片定位到起始位置
            }
            this.handleMove()
          }, interval)
        }
      },
      /**
       * 触摸开始事件，记录下触摸点
       */
      onTouchStart(e) {
        this.touchStart = e.changedTouches[0] // 记录开始触摸点
        // 清除定时器
        this.clearTimer()
      },
      onTouchMove(e) {
        if (!event.touches.length) {
          return
        }
        let moveX = e.touches[0].pageX - this.touchStart.pageX
        if (!(this.index === 0 && moveX > 0) && !(this.index === this.list.length - 1 && moveX < 0)) {
          this.swiperStyle = {
            transform: 'translateX(' + (-this.index * this.itemWidth + moveX - this.options.bSidesWidth) + 'px)' // 根据手指的位置移动页面
          }
        }
      },
      /**
       * 触摸结束事件，记录下触摸点，比较当前点和触摸开始点，判断触摸方向
       */
      onTouchEnd(e) {
        this.touchEnd = e.changedTouches[0]
        // 比较移动的点位差，正数就是右滑，负数就是左滑
        if (this.touchEnd.clientX - this.touchStart.clientX > 0) {
          this.index--
          if (this.index <= 0) {
            this.index = 0
          }
        } else if (this.touchEnd.clientX - this.touchStart.clientX < 0) {
          this.index++
          if (this.index >= this.list.length - 1) {
            this.index = this.list.length - 1
          }
        }
        // 处理当前的滑动
        this.handleMove()
        // 同时开启自动轮播
        this.handleLoopMove()
      },
      /**
       * 清除定时器
       * */
      clearTimer() {
        this.intervalTime && clearInterval(this.intervalTime)
      },
      // ................. 可以提供给父组件调用的方法 start .................
      /**
       * 将轮播定位到某个item
       * @index 要定位的item index
       * */
      swiperScrollTo(index) {
        this.clearTimer()
        this.$nextTick(() => {
          this.index = index
          this.handleMove()
        })
      },
      // ................. 可以提供给父组件调用的方法 end .................
    },
    mounted() {
      window.addEventListener('resize', this.calcWidth, false)
      this.calcWidth()
      this.handleLoopMove()
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.calcWidth, false)
      // 清除定时器
      this.clearTimer()
    }
  }
</script>
<style lang="less" scoped>
  .swiper-component {
    /*overflow-x: hidden;*/
    height: 3rem;
    position: relative;
    transform: scale(0.72);
    box-sizing: border-box;
    ul {
      white-space: nowrap;
      height: 100%;
      transition: 500ms ease;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      li {
        list-style: none;
        height: 100%;
        /*float: left;*/
        overflow: hidden;
        flex: none;
        /*border-radius: 0.16rem;*/
        > div {
          position: relative;
          color: #ffffff;
          text-align: center;
          width: 100%;
          height: 100%;
        }
        img {
          /*width: auto;*/
          /*height: auto;*/
          /*width: 100%;*/
          width: auto;
          height: 100%;
        }
        &.zoom {
          /*transform-origin: center 0; // 可以设置缩放点*/
          transform: scale(1);
          transition: all 0.5s ease;
          opacity: .65;
          &.active {
            transform: scale(1.4);
            opacity: 1;
            z-index: 88;
            /*box-shadow: 0 0 15px rgba(1, 123, 147, 0.9);*/
          }
        }
      }
    }
    .swiper-dots {
      position: absolute;
      bottom: 0.16rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      .dots-item {
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        margin: 0rem 0.04rem;
        &.active {
          background: #409eff;
        }
      }
    }
  }
</style>

