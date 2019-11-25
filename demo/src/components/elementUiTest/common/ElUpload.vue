<!--elementui 文件上传-->
<template>
  <div>
    <!--重写上传的文件列表-->
    <div class="f-ul-wrap">
      <ul class="f-downloaded">
        <template v-for="(item,index) in fileList">
          <li :key="index">
            <a @click="handlePreview(item)" :title="item.name">
              <template v-if="$FIName(item.name)===''">
                <i class="el-icon-document"></i>
              </template>
              <template v-else>
                <img class="f-img" :src="$FIName(item.name)"/>
              </template>
              {{item.name}}
            </a>
            <label><i class="el-icon-upload-success el-icon-circle-check"></i></label>
            <i class="el-icon-close" @click="remove(item,index)"></i>
          </li>
        </template>
        <i class="el-icon-loading" v-if="loading"></i>
      </ul>
    </div>
    <el-upload
      :show-file-list="false"
      :name="name"
      multiple
      :limit="2"
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="onBeforeUpload"
      :on-exceed="onExceed"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :file-list="fileList">
      <!--<i class="el-icon-upload"></i>-->
      <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
      <!--<div class="el-upload__tip" slot="tip">最多只能上传两个附件</div>-->
      <el-button size="small" type="primary">上传文件</el-button>
      <div slot="tip" class="el-upload__tip">最多只能上传两个附件</div>
    </el-upload>
  </div>
</template>

<script>

  export default {
    props: {
      urlVal: {
        type: Array,
        default () {
          return []
        }
      },
      name: {
        type: String,
        default: 'upload'
      }
    },
    data: function () {
      return {
        loading: false,
        // uploadUrl: appConfig.uploadUrl(),
        // 上传相关
        fileList: [
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      }
    },
    methods: {
      remove (item, index) {
        this.$confirm(`确定移除 ${item.name}？`).then(() => {
          let fileList = this.fileList
          fileList && (fileList.splice(index, 1))
          this.updateVal(fileList)
        }).catch(() => {
          // console.log('取消')
        })
      },
      // // 文件列表移除文件时的钩子
      // handleRemove (file, fileList) {
      //   console.log(file, fileList)
      //   this.updateVal(fileList)
      // },
      // 点击文件列表中已上传的文件时的钩子
      handlePreview (file) {
        // console.log(file)
        if (file.url) {
          window.open(file.url, '_blank')
        } else if (file.raw) {
          window.open(window.URL.createObjectURL(file.raw), '_blank')
        }
      },
      // 文件超出个数限制时的钩子
      onExceed (files, fileList) {
        this.$message.warning(`最多只能上传两个文件`)
      },
      // 删除文件之前的钩子
      // beforeRemove (file, fileList) {
      //   return this.$confirm(`确定移除 ${file.name}？`)
      // },
      onBeforeUpload (file) {
        // const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
        // const isLt1M = file.size / 1024 / 1024 < 1;
        //
        // if (!isIMAGE) {
        //   this.$message.error('上传文件只能是图片格式!');
        // }
        // if (!isLt1M) {
        //   this.$message.error('上传文件大小不能超过 1MB!');
        // }
        // return isIMAGE && isLt1M;
      },
      // 文件上传时的钩子
      onProgress (event, file, fileList) {
        this.loading = true
        console.log(event, file, fileList)
      },
      // 文件上传成功时的钩子
      onSuccess (response, file, fileList) {
        console.log(response, file, fileList)
        // console.log('得到上传地址', window.URL.createObjectURL(file.raw), 3333)
        this.updateVal(fileList)
      },
      // 文件上传失败时的钩子
      onError () {
        this.$message.error('上传失败')
      },
      /**
       *  更新值
       * */
      updateVal (fileList) {
        this.fileList = fileList
        this.$emit('update:urlVal', this.getUrl())
        this.loading = false
      },
      /**
       *  返回上传的地址数组
       * */
      getUrl () {
        return this.fileList.map((item) => {
          if (item.raw) {
            return window.URL.createObjectURL(item.raw)
          }
          return item.url
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .f-ul-wrap {
    background: rgba(204, 204, 204, 0.1);
  }

  ul, li {
    list-style: none;
    padding: 0;
  }

  ul {
    display: inline-block;
    margin: 0 auto;
    /*overflow: hidden;*/

    text-align: center;
    border-radius: 4px;
  }

  .f-downloaded {
    li {
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      font-size: 14px;
      color: #606266;
      border-radius: 4px;
      cursor: pointer;
      text-align: left;
      line-height: 1.8;
      position: relative;
      padding: 5px 5px;
      display: flex;
      align-items: center;

      a {
        min-width: 300px;
        color: #606266;
        display: block;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        -webkit-transition: color .3s;
        transition: color .3s;
        white-space: nowrap;

        &:hover {
          color: #409EFF;
          cursor: pointer;
        }

        i {
          margin-right: 7px;
        }
      }

      label {
        margin-left: 5px;
        line-height: inherit;
        display: block;
      }

      .el-icon-close {
        margin-left: 5px;
        display: none;
        cursor: pointer;
        opacity: .75;
        color: #606266;
      }

      &:hover {
        label {
          display: none;
        }

        .el-icon-close {
          display: block;
        }
      }
    }

    .el-icon-upload-success {
      color: #67c23a;
    }

    .f-img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
  }

  .el-upload__tip {
    color: #ea9a7b;
    margin-top: 0;
  }
</style>
