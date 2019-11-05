<!--例2-->
<!--不需要 template，若template存在，则无法渲染render-->
<!--<template>-->
<!--<div class="ddd"></div>-->
<!--</template>-->

<script>
  import AnchoredHeading from './AnchoredHeading'

  export default {
    components: {
      AnchoredHeading
    },
    props: {
      pName: {
        type: Number,
        required: true
      }
    },
    methods: {
      clickHandler () {
        alert('hello')
      }
    },
    render (createElement) {
      return createElement(
        'div', // 标签名称
        {
          'class': {
            foo: true,
            bar: false
          },
          style: {
            cursor: 'pointer'
          },
          on: {
            click: this.clickHandler
          }
        },
        [
          '先写一些文字' + this.pName,
          createElement('h1', 'createElement'),
          createElement(AnchoredHeading, {
            props: {
              level: 3
            }
          }, ['createElement引用组件']),
          ...this.$slots.default
        ]
      )
    }
  }
</script>

<style>
</style>
