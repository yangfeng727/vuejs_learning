<template>
  <div>
      <el-upload :url-val.sync="model.upload"/>
  </div>
</template>

<script>
  import ElUpload from './common/ElUpload'

  export default {
    name: 'upload',
    components: {
      ElUpload
    },
    data: function () {
      return {
        model: {}
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
