<template>
  <div class="com-wrap">
    <rich-text-editor :uploadUrl="uploadUrl" :content.sync="textContent"/>
    <el-button type="primary" @click="coCon">点击打印</el-button>
  </div>
</template>

<script>
  import RichTextEditor from './common/RichTextEditor'

  export default {
    name: 'upload',
    components: {
      RichTextEditor
    },
    data: function () {
      return {
        uploadUrl: '', // 图片上传地址
        textContent: ''
      }
    },
    methods: {
      coCon () {
        console.log(this.textContent)
      }
    },
    beforeCreate: function () {
      // let caseId = this.$route.params.caseId
      // this.$getJson({
      //   url: '/identityVerification/detail.do?caseId=' + caseId,
      //   callback: function (vue, ret) {
      //     vue.content = ret['content']
      //   }
      // })
    }
  }
</script>

<style scoped lang="less">
</style>
