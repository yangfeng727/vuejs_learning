<!--富文本编辑器-->
<template>
  <div class="RichTextEditor-Wrap">
    <!-- 图片上传组件辅助-->
    <el-upload
      v-show="false"
      :show-file-list="false"
      :name="name"
      multiple
      :action="uploadUrl"
      :before-upload="onBeforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :file-list="fileList">
      <!--<i class="el-icon-upload"></i>-->
      <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
      <!--<div class="el-upload__tip" slot="tip">最多只能上传两个附件</div>-->
      <el-button size="small" type="primary" class="quill-img">上传文件</el-button>
    </el-upload>

    <quill-editor :content="content"
                  :options="editorOption"
                  class="ql-editor"
                  ref="myQuillEditor"
                  @change="onEditorChange($event)">
    </quill-editor>
  </div>
</template>
<script>
  // require styles
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  // 设置title
  import {addQuillTitle} from './quill-title.js'

  // 工具栏
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'font': []}],
    [{'color': []}, {'background': []}], // dropdown with defaults from theme
    [{'align': []}],
    [{'clean': '清楚'}], // remove formatting button
    // ['link', 'image', 'video']
    ['link', 'image']
  ]
  export default {
    name: 'RichTextEditor',
    components: {
      quillEditor
    },
    props: {
      content: { // 返回的html片段
        type: String,
        default: ''
      },
      uploadUrl: { // 图片上传地址
        type: String,
        default: ''
      },
      maxSize: { // 文件上传大小限制，默认不超过2M
        type: [String, Number],
        default: 2
      },
      name: { // 文件上传字段
        type: String,
        default: 'Filedata'
      }
    },
    data: function () {
      return {
        editorOption: {
          placeholder: '',
          theme: 'snow', // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                'image': function (value) { // 编辑器固定写法
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.quill-img').click()
                  } else {
                    this.quill.format('image', false)
                  }
                }
              }
            }
          }
        },
        fileList: []
      }
    },
    mounted () {
      // 初始给编辑器设置title
      addQuillTitle()
    },
    methods: {
      // 文本编辑
      onEditorChange ({quill, html, text}) {
        // console.log('editor change!', quill, html, text)
        // console.log(html.replace(/<[^>]*>|/g, ''), 33333333)
        // this.content = html
        this.$emit('update:content', html)
      },
      uploadSuccess (res) { // 把已经上传的图片显示回富文本编辑框中
        // res返回的格式是{url:"图片的路径"}，这个是后台接口返回的
        let quill = this.$refs.myQuillEditor.quill
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res)
        // 调整光标到最后
        quill.setSelection(length + 1)
      },
      // el-文件上传组件
      onBeforeUpload (file) {
        let acceptArr = ['image/jpeg', 'image/gif', 'image/png']
        const isIMAGE = acceptArr.indexOf(file.type) > 0
        const isLt1M = file.size / 1024 / 1024 < this.maxSize
        if (!isIMAGE) {
          this.$message.error('只能插入图片格式!')
        }
        if (!isLt1M) {
          this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`)
        }
        return isLt1M && isIMAGE
      },
      // 文件上传成功时的钩子
      onSuccess (response, file, fileList) {
        if (response.retCode === '00') {
          this.uploadSuccess(response.url)
        } else {
          this.$message.error('上传失败')
        }
      },
      // 文件上传失败时的钩子
      onError (file, fileList) {
        this.$message.error('上传失败')
      }
    }
  }
</script>
<style>
  .RichTextEditor-Wrap .ql-container {
    height: 300px;
  }

  .RichTextEditor-Wrap .ql-editor {
    padding: 0;
  }

  .RichTextEditor-Wrap .ql-tooltip {
    left: 5px !important;
  }
</style>
