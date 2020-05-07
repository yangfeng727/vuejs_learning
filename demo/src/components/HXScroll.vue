<!-- 横向滚动 -->
<template>
  <div class="topMove" id="topMove">
    <div class="scroll" id="topMove-scroll">
      <div>
        <template v-for="(item,index) in list">
          <span @click="clickItem(item)" :key="index">{{item}}<i class="el-icon-d-arrow-right"
                                                                 v-if="index<list.length-1"></i></span>
        </template>
      </div>
    </div>
    <div class="fc" v-if="list.length>0">
      <img @click="clickLeft" src="../assets/img/left-arrow.png"/>
      <span></span>
      <img @click="clickRight" src="../assets/img/right-arrow.png"/>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      clickLeft (e) {
        let scrollDom = $('#topMove-scroll')
        let scrollLeft = scrollDom.scrollLeft()
        let num = 200
        if (scrollLeft < num) {
          scrollLeft = 0 // 左侧到底了
        } else {
          scrollLeft -= num
        }
        scrollDom.stop(true).animate({
          scrollLeft: scrollLeft
        }, 1200)
        // scrollDom.scrollLeft(scrollLeft)
      },
      clickRight (e) {
        let scrollDom = $('#topMove-scroll')
        let scrollLeft = scrollDom.scrollLeft()
        let now = scrollDom.find('>div').width() - scrollDom.width() - scrollLeft
        let num = 200
        if (now < num) { // 右侧到底了（子级【需要设置display:inline-block】width()-父级width()-scrollLeft=0）
          scrollLeft = scrollLeft + now
        } else {
          scrollLeft += num
        }
        // scrollDom.scrollLeft(scrollLeft)
        scrollDom.stop(true).animate({
          scrollLeft: scrollLeft
        }, 1200)
      },
      clickItem (item) {
        this.$emit('change', item)
      }
    }
  }
</script>

<style scoped lang="less">
  .topMove {
    position: absolute;
    left: 124px;
    right: 0;
    top: 0;
    overflow: hidden;
    height: 48px;
    padding-right: 120px;

    .scroll {
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      padding-bottom: 20px;

      > div {
        display: inline-block;
      }
    }

    .el-icon-d-arrow-right {
      margin-right: 10px;
      margin-left: 5px;
    }

    .fc {
      padding: 0 3px;
      background-color: #ffffff;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      width: 60px;
      height: 45px;
      overflow-y: hidden;
      box-shadow: -2px 0px 3px rgba(0, 0, 0, 0.1);
      border-radius: 0px 6px 0px 0px;
      text-align: center;

      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        cursor: pointer;
      }

      span {
        cursor: pointer;
        vertical-align: middle;
        display: inline-block;
        height: 20px;
        width: 1px;
        background: rgba(2, 47, 74, 0.15);
        // margin: 0 2px;
      }
    }
  }
</style>
