<template>
  <el-input :value="value"
            :clearable="clearable"
            :placeholder="placeholder"
            :maxlength="maxlength"
            @input="inputHandle"
            @change="changeHandle"
            @blur="blurHandle"
            @focus="focusHandle"
            @clear="$emit('clear')"></el-input>
</template>

<script>
  export default {
    name: 'InputNumber',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      rReg: {
        type: Object,
        defalut: /^(0+)|[^\d]+/g
      },
      value: '',
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      maxlength: ''
    },
    data () {
      return {
        normalSet: {}
      }
    },
    mounted () {
      // this.maxlength && (this.$set('normalSet', 'maxlength', this.maxlength))
    },
    methods: {
      setValPd (val) {
        let value = val.replace(this.rReg, '')
        console.log(this.rReg,value, 6666)
        return {
          val: value,
          change: val === value // 是否更改
        }
      },
      caFn (val, callback) {
        let res = this.setValPd(val)
        // if (res.change) { // 值变化才通知
        callback && callback(res.val)
        // }
      },
      inputHandle (val) {
        this.caFn(val, (value) => {
          this.$emit('input', value)
        })
      },
      changeHandle (val) {
        this.caFn(val, (value) => {
          this.$emit('change', value)
        })
      },
      blurHandle (e) {
        this.$emit('blur', e)
      },
      focusHandle (e) {
        this.$emit('focus', e)
      }

    }
  }
</script>

<style>
</style>
