<!--级联组件-->
<template>
  <div class="cas-input" :style="classObj" @click="inputClick">
    <input type="text" readonly="readonly" autocomplete="off" value="">
    <span class="input-arrow"><i :class="{active:active}"></i></span>
  </div>
</template>

<script>
// import $ from 'jQuery'

export default {
  name: 'Cascade',
  props: {
    width: {
      type: String
    }
  },
  data () {
    return {
      classObj: {
        width: this.width
      },
      active: false
    }
  },
  mounted () {
    // $('body').css('background', '#ccc')
  },
  methods: {
    inputClick: function () {
      this.active = !this.active
      console.log(this.active)
    }
  }
}
</script>

<style scoped>
  .cas-input {
    position: absolute;
  }

  .cas-input > input {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    padding-right: 30px;
  }

  .cas-input > .input-arrow {
    position: absolute;
    height: 100%;
    width: 30px;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  .cas-input > .input-arrow > i {
    width: 8px;
    height: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -4px;
    margin-left: -4px;
    transition: transform .3s, -webkit-transform .3s;
  }

  /*箭头*/
  .cas-input > .input-arrow > i {
    box-sizing: border-box;
    border: 1px solid #c0c4cc;
    border-style: none none solid solid;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .cas-input > .input-arrow > i.active {
    transform: rotate(135deg);
  }

  /*.cas-input > .input-arrow>i{*/
  /*font-family: element-icons!important;*/
  /*speak: none;*/
  /*font-style: normal;*/
  /*font-weight: 400;*/
  /*font-variant: normal;*/
  /*text-transform: none;*/
  /*line-height: 1;*/
  /*vertical-align: baseline;*/
  /*display: inline-block;*/
  /*-webkit-font-smoothing: antialiased;*/

  /*-webkit-transition: -webkit-transform .3s;*/
  /*transition: -webkit-transform .3s;*/
  /*transition: transform .3s;*/
  /*transition: transform .3s,-webkit-transform .3s;*/
  /*font-size: 14px;*/
  /*}*/
  /*.cas-input > .input-arrow>i:before{*/
  /*content: "\E603";*/
  /*}*/
  /*.cas-input > .input-arrow>i:after{*/
  /*content: '';*/
  /*height: 100%;*/
  /*width: 0;*/
  /*display: inline-block;*/
  /*vertical-align: middle;*/
  /*}*/
</style>
