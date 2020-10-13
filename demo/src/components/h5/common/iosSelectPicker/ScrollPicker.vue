<template>
  <div class="col-wrapper" :style="getWrapperHeight">
    <ul class="wheel-list" :style="getListTop" ref="wheel">
      <li :class="{'wheel-item':true}" v-for="item in scrollValues" :style="initWheelItemDeg(item.index)">
        <slot :data="item">{{item.value}}</slot>
      </li>
    </ul>
    <div class="cover" :style="getCoverStyle"></div>
    <div class="divider" :style="getDividerStyle"></div>
  </div>
</template>
<script>
  import Animate from './animate';

  const a = -0.003; // 加速度
  let isInertial = false; // 是否正在惯性滑动

  // const a = -0.003; // 加速度
  // const radius = 100; // 半径
  // const lineHeight = 36; // 文字行高
  // let isInertial = false; // 是否正在惯性滑动
  // // 根据三角形余弦公式
  // // 反余弦得到弧度再转换为度数,这个度数是单行文字所占有的。
  // let deg = Math.round((Math.acos((((radius * radius) + (radius * radius)) - (lineHeight * lineHeight)) / (2 * radius * radius)) * 180) / Math.PI);
  // // deg这个值须360能整除，因为当滚动列占满一周后可以再次均匀的覆盖在上一周文字上；滚动时不会出现错位
  // while (360 % deg !== 0 && deg <= 360) {
  //   deg += 1;
  // }
  // const singleDeg = deg;
  // // 半圆下的内容条数
  // const space = Math.floor((360 / singleDeg) / 2);
  export default {
    name: 'ScrollPicker',
    props: {
      // initValue: { // 初值
      //   type: [Number, String],
      //   default: '',
      // },
      slectValue: { // 选中值（注意，该值用于父组件需要让选择器选中某个值，而不能用于判断当前选中的值，即this.$emit('select', pickValue);时不能再次赋值给slectValue，这会造成选择器有渲染问题）
        type: [Number, String],
        default: '',
      },
      list: {
        type: Array,
        default() {
          return [1, 2, 3, 4];
        },
      },
      lineHeight: { // 单行文本行高
        type: Number,
        default: 36,
      },
      radius: { // 半径
        type: Number,
        default: 100,
      },
    },
    data() {
      return {
        singleDeg: 0, // 单行文字所占有的度数
        space: 0, // 半圆下的内容条数
        values: [],
        finger: {
          startY: 0,
          endY: 0,
          startTime: 0, // 开始滑动时间（单位：毫秒）
          entTime: 0, // 结束滑动时间（单位：毫秒）
          currentMove: 0,
          prevMove: 0,
        },
        range: {
          start: '',
          end: '',
          space: '',
        },
      };
    },
    watch:{
      list(newArr){
        this.values = newArr
      },
      slectValue(newVal,oldVal){
        // let arrList  = this.scrollValues
        // console.log(arrList[Math.floor(arrList.length/2)].value, 888)
       // if( arrList.length>0 && arrList[Math.floor(arrList.length/2)].value !== newVal){
         if(newVal !== oldVal){
           // 更新list同时需要更新范围
           if(this.space){
             this.range.start =  -this.space;
             this.range.end = this.space;
           }
           // 重置变量
           this.finger={
             startY: 0,
               endY: 0,
               startTime: 0, // 开始滑动时间（单位：毫秒）
               entTime: 0, // 结束滑动时间（单位：毫秒）
               currentMove: 0,
               prevMove: 0,
           }
           this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, 0deg)`;
           this.changeListHandle(newVal)
         }

      }
    },
    computed: {
      scrollValues() {
        const result = [];
        for (let i = this.range.start; i <= this.range.end; i += 1) {
          result.push({
            value: this.getRangeData(i),
            index: i,
          });
        }
        return result;
      },
      getListTop() {
        return {
          top: `${this.radius - Math.round(this.lineHeight / 2)}px`,
          height: `${this.lineHeight}px`,
        };
      },
      getWrapperHeight() {
        return {
          height: `${2 * this.radius}px`,
        };
      },
      getCoverStyle() {
        return {
          backgroundSize: `100% ${this.radius - Math.round(this.lineHeight / 2)}px`,
        };
      },
      getDividerStyle() {
        return {
          top: `${this.radius - Math.round(this.lineHeight / 2)}px`,
          height: `${this.lineHeight - 2}px`,
        };
      },
      animate() {
        return new Animate();
      },
    },
    created() {
      this.changeListHandle(this.slectValue)

      let lineHeight = this.lineHeight; // 文字行高

      // 根据三角形余弦公式
      // 反余弦得到弧度再转换为度数,这个度数是单行文字所占有的。
      let deg = Math.round(
        (Math.acos(
          (((this.radius * this.radius) + (this.radius * this.radius)) - (lineHeight * lineHeight)) / (2 * this.radius * this.radius)) *
          180) / Math.PI);
      // deg这个值须360能整除，因为当滚动列占满一周后可以再次均匀的覆盖在上一周文字上；滚动时不会出现错位
      while (360 % deg !== 0 && deg <= 360) {
        deg += 1;
      }
      this.singleDeg = deg;
      // 半圆下的内容条数
      this.space = Math.floor((360 / this.singleDeg) / 2);
      this.range = {
        start: -this.space,
        end: this.space,
        space: this.space,
      };
    },
    mounted() {
      this.$el.addEventListener('touchstart', this.listenerTouchStart, false);
      this.$el.addEventListener('touchmove', this.listenerTouchMove, false);
      this.$el.addEventListener('touchend', this.listenerTouchEnd, false);
    },
    beforeDestory() {
      this.$el.removeEventListener('touchstart', this.listenerTouchStart, false);
      this.$el.removeEventListener('touchmove', this.listenerTouchMove, false);
      this.$el.removeEventListener('touchend', this.listenerTouchEnd, false);
    },
    methods: {
      changeListHandle(slectValue){
        if (slectValue || slectValue === 0) {
          this.values = this.changeList(this.list, slectValue);
        } else {
          this.values = this.list;
        }
      },
      /**
       *  重新构造list，将设置的初值放置首位
       *  @arr 需要构造的数组原值
       *  @val 需要前置的值
       * */
      changeList(arr, val) {
        let brr = [];
        let index = arr.findIndex(item => item === val);
        if (index > -1) {
          brr = [...arr.slice(index), ...arr.slice(0, index)];
        } else {
          brr = arr;
        }
        return brr;
      },
      initWheelItemDeg(index) {
        return {
          transform: `rotate3d(1, 0, 0, ${(-1 * index) * this.singleDeg}deg) translate3d(0, 0, ${this.radius}px)`,
          height: `${this.lineHeight}px`,
          lineHeight: `${this.lineHeight}px`,
        };
      },
      listenerTouchStart(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        isInertial = false;
        this.finger.startY = ev.targetTouches[0].pageY;
        this.finger.prevMove = this.finger.currentMove;
        this.finger.startTime = Date.now();
      },
      listenerTouchMove(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        const move = (this.finger.startY - ev.targetTouches[0].pageY) + this.finger.prevMove;
        this.finger.currentMove = move;
        this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${(move / this.lineHeight) * this.singleDeg}deg)`;
        this.updateRange(Math.round(move / this.lineHeight));
      },
      listenerTouchEnd(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.finger.endY = ev.changedTouches[0].pageY;
        this.finger.endTime = Date.now();
        this.getInertiaDistance();
      },
      updateRange(spinAim) {
        this.range.start = (this.range.space * -1) + spinAim;
        this.range.end = this.range.start + (this.range.space * 2);
      },
      getRangeData(index) {
        index %= this.values.length;
        return this.values[index >= 0 ? index : index + this.values.length];
      },
      getSelectValue(move) {
        // const index = Math.abs(move / this.lineHeight);
        const index = move / this.lineHeight;
        const pickValue = this.getRangeData(index);
        // this.$emit('update:slectValue', pickValue);
        this.$emit('select', pickValue);
      },
      /**
       * 求移动速度（v = s / t），判断用户操作快慢，从而得到惯性的滑动距离
       */
      getInertiaDistance() {
        // 移动距离
        const s = this.finger.startY - this.finger.endY;
        // 移动时间
        const t = this.finger.endTime - this.finger.startTime;
        // 移动速度
        const v = s / t;
        const absV = Math.abs(v);
        isInertial = true;
        this.inertia(absV, Math.floor(absV / v), 0);
      },
      /**
       * 用户结束滑动，应该慢慢放慢，最终停止。从而需要 a(加速度)
       * @param start 开始速度
       * @param position 速度方向，值: 正负1
       * @param target 结束速度
       */
      inertia(start, position, target) {
        if (start <= target || !isInertial) {
          this.animate.stop();
          this.finger.prevMove = this.finger.currentMove;
          this.updateRange(Math.round(this.finger.currentMove / this.lineHeight));
          this.getSelectValue(this.finger.currentMove);
          return;
        }
        // 这段时间走的位移 S = vt + 1/2at^2;
        const move = (position * start * (1000 / 60)) + (0.5 * a * (1000 / 60) * (1000 / 60)) + this.finger.currentMove;
        // 根据求末速度公式： v末 = v初 + at
        const newStart = (position * start) + (a * (1000 / 60));
        let moveDeg = (move / this.lineHeight) * this.singleDeg;
        let actualMove = move;
        // 已经到达目标
        if (newStart <= target) {
          moveDeg = Math.round(move / this.lineHeight) * this.singleDeg;
          actualMove = Math.round(move / this.lineHeight) * this.lineHeight;
          this.$refs.wheel.style.transition = 'transform 700ms cubic-bezier(0.19, 1, 0.22, 1)';
        } else {
          this.$refs.wheel.style.transition = '';
        }
        this.finger.currentMove = actualMove;
        this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${moveDeg}deg)`;
        this.updateRange(Math.round(this.finger.currentMove / this.lineHeight));
        this.animate.start(this.inertia.bind(this, newStart, position, target));
      },
    },
  };

</script>

<style lang="less">
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .col-wrapper {
    position: relative;
    border: 1px solid #CCC;
    height: 300px;
    overflow: hidden;
    text-align: center;

    .wheel-list {
      position: absolute;
      width: 100%;
      transform-style: preserve-3d;
      z-index: 3;

      .wheel-item {
        backface-visibility: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }

    .cover {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(180deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6)), linear-gradient(0deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6));
      background-position: top, bottom;
      background-repeat: no-repeat;
      z-index: 4;
    }

    .divider {
      position: absolute;
      width: 100%;
      left: 0;
      border-top: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
    }
  }
</style>
