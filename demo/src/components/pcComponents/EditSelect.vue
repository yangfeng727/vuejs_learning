<template>
  <span style="display: inline-block;">

      <!--<el-select :disabled="disabled" :value="getSVal" @change="change" :placeholder="placeholder" :name="name"-->
                 <!--:filterable="canEdit" allow-create>-->
    <!--<el-option v-if="showEmpty" :label="label" value="">-->
    <!--</el-option>-->
    <!--<template v-if="isArr()">-->
      <!--<el-option-->
        <!--v-for="(item,index) in options"-->
        <!--:key="index"-->
        <!--:label="item[arrText]"-->
        <!--:value="item[arrValue]">-->
        <!--&lt;!&ndash;<slot name="item" :row="id"></slot>&ndash;&gt;-->
      <!--</el-option>-->
    <!--</template>-->
    <!--<template v-else>-->
      <!--<el-option-->
        <!--v-for="(name,id) in options"-->
        <!--:key="id"-->
        <!--:label="name"-->
        <!--:value="id">-->
        <!--<slot name="item" :row="id"></slot>-->
      <!--</el-option>-->
    <!--</template>-->
  <!--</el-select>-->


     <el-select
       :value="selectedId"
       filterable
       allow-create
       :name="name"
       @change="change"
       :placeholder="placeholder">
      <el-option
       v-for="(item,index) in options"
       :key="index"
       :label="item[arrText]"
       :value="item">
       <!--<slot name="item" :row="id"></slot>-->
       </el-option>
  </el-select>
  </span>
</template>
<script>
  export default {
    name: 'EnumSelect',
    model: {
      prop: 'selectedId',
      event: 'change'
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      showEmpty: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      selectedId: '',
      options: { // {1:'测试'} [{value:'1',text:'测试'}]
        type: [Object, Array],
        default() {
          return {}
        }
      },
      arrValue: { // option为数组时对象数组 value
        type: String,
        default: 'value'
      },
      arrText: { // option为数组时对象数组 text
        type: String,
        default: 'text'
      },
      label: {
        type: String,
        default() {
          return '全部'
        }
      },
      placeholder: {
        type: String,
        default() {
          return '请选择'
        }
      },
      canEdit: { // 是否可以编辑
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      filterFn(val) {
        // console.log(val)
      },
      selectBlur(e) {
        if (!this.canEdit) return
        if (e.target.value) {
          this.$emit('change', e.target.value)
          // this.ruleForm.subjectId = e.target.value;
          // this.isName = true;
        } else {
          // this.isName = false;
        }
      },
      change: function (value) {
        this.$emit('change', value)
      },
      isArr() {
        return Object.prototype.toString.call(this.options) === '[object Array]'
      }
    },
    mounted() {
      // this.value = this.$getObjVal(this.options, this.selectedId, '')
    },
    watch: {
      // selectedId () {
      //   this.value = this.$getObjVal(this.options, this.selectedId, '')
      // },
      // options: {  // option是对象，需要
      //   handler (newValue, oldValue) {
      //     this.value = this.$getObjVal(newValue, this.selectedId, '')
      //   },
      //   deep: true
      // }
    },
    computed: {
      getSVal() {
        if (this.isArr()) {
          let o = this.options.find(item => item.value === this.selectedId
        )
          return o ? o[this.arrText] : ''
        } else {
          return this.$getObjVal(this.options, this.selectedId)
        }
      }
    }
  }
</script>
