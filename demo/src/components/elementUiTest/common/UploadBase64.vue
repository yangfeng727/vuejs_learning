<!--图片 base64上传并显示进度-->
<template>
  <div class="up-base64-wrap">
    <div class="bn-top">
      <el-button type="primary">更换照片</el-button>
      <input type="file" @change="changeImg" accept="image/jpg,image/jpeg"/>
    </div>
    <div class="bn-bottom">
      <div class="f-s-list" v-for="(item,index) in fileList" :key="index">
        <p :title="item.fileName"><i class="el-icon-paperclip"></i>{{item.fileName}}
          <template v-if="!item.finished">
            <label><span>{{item.percent}}%</span></label>
          </template>
          <template v-else>
            <label class="l-sus"><span class="el-icon-upload-success el-icon-circle-check"></span></label>
            <label class="l-close"><span class="el-icon-close" @click="remove(item,index)"></span></label>
          </template>
        </p>
        <transition name="fade">
          <progress-bar v-show="!item.finished" :percentage="item.percent" :show-text="false"></progress-bar>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import {Progress} from 'element-ui'

  export default {
    components: {
      ProgressBar: Progress
    },
    props: {
      fileList: {
        type: Array,
        default () {
          return [
            // {
            //   fileName: 'xx.jpg', // 文件名
            //   finished: false, // 上传（转base64）完成
            //   percent: 100, // 上传进度
            //   data: '' //  base64
            // }
          ]
        }
      }
    },
    data () {
      return {
        imageList: []
      }
    },
    methods: {
      /**
       *  更新值
       * */
      updateVal (fileList) {
        this.imageList = fileList
        this.$emit('update:fileList', fileList)
        this.$emit('success', fileList) // 方法
      },
      sPercent (item, re) {
        item.percent = Math.floor(100 * re.loaded / re.total)
      },
      remove (item, index) {
        this.imageList.splice(index, 1)
        this.updateVal(this.imageList)
      },
      changeImg (e) {
        let fil = e.target.files[0]
        let bool = false
        !fil.type && (bool = true)
        fil.type.toUpperCase().indexOf('JPG') > 0 && (bool = true)
        fil.type.toUpperCase().indexOf('JPEG') > 0 && (bool = true)
        if (!bool) {
          this.$warningMessage('只能上传jpg格式！')
          return
        }
        // if (fil.size > 5*1024*1024) {
        //   alert('请选择5M以内的图片！');
        //   return false
        // }
        let self = this
        let reader = new FileReader()
        let dataItem = {
          finished: false,
          data: '',
          fileName: fil.name,
          percent: 0
        }
        this.updateVal([dataItem])
        reader.onloadstart = (re) => {
          console.log('onloadstart', re)
          self.sPercent(dataItem, re)
        }
        reader.onprogress = (re) => {
          console.log('onprogress', re)
          self.sPercent(dataItem, re)
        }
        reader.onload = (re) => {
          console.log('onload', re)
          self.sPercent(dataItem, re)
        }
        reader.onloadend = (re) => {
          // console.log('onloadend', re.target.result)
          setTimeout(() => { // 延迟进度条加载效果
            dataItem = {
              ...dataItem,
              data: re.target.result,
              finished: true
            }
            self.updateVal([dataItem])
          }, 200)
        }
        reader.onerror = (e) => {
          this.$errorMessage('文件上传失败，请重试！')
        }
        reader.readAsDataURL(fil)
      }
    }
  }
</script>
<style scoped lang="less">
  .up-base64-wrap {
    display: inline-block;
    width: 100%;
    input {
      cursor: pointer;
      position: absolute;
      opacity: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
    }

    .bn-top {
      padding: 20px 0;
      display: inline-block;
      position: relative;
    }

    .bn-bottom {
      display: table;
      width: 100%;
    }

    .f-s-list {
      transition: all .5s cubic-bezier(.55, 0, .1, 1);
      text-align: left;
      font-size: 18px;
      color: #2B3B4E;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      display: table-cell;
      &:hover p {
        color: #409EFF;
      }
      p {
        position: relative;
        padding: 8px 50px 8px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 3px;
      }

      label {
        margin-left: 5px;
        line-height: inherit;
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        span {
          vertical-align: sub;
        }
      }

      .l-close {
        display: none;
      }

      .l-sus {
        span {
          color: #67c23a;
        }
      }

      .el-icon-close {
        margin-left: 5px;
        cursor: pointer;
        opacity: .75;
        color: #606266;
      }

      &:hover {
        .l-sus {
          display: none;
        }

        .l-close {
          display: block;
        }
      }
    }
  }

  /deep/ .el-progress-bar__outer {
    height: 6px !important;
  }
</style>


