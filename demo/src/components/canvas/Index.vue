<template>
  <div class="sign">
    <h1>canvas 画板</h1>
    <div class="signArea">
      <draw ref="draw"></draw>
    </div>
    <div class="signBtn">
      <button @click="$refs.draw.clear()">重新签字</button>
      <button @click="getImage" class="confireSign">确认签字</button>
    </div>
    <div style="boder:1px solid #cccccc;">
      <img :src="imgData"/>
    </div>
  </div>
</template>

<script>
    import Draw from './common/draw-ipad'
    export default {
        name: "tjSign",
        components: { Draw },
        data() {
            return {
              userId: '',
              imgData: '',
              imgShow: false,
            }
        },
        created() {
        },
        methods: {
            async getImage() {
                if (!this.$refs.draw.getPNGImg()) {
                    alert('请签字后再保存');
                    return;
                }
                try {
                    // 判断签字大小
                    this.imgData = this.$refs.draw.getPNGImg();
                    // let img = new Image();
                    // img.src = this.imgData;
                    // await this.getImageSize(img, 5);
                    // img = null;
                    // let formData = new FormData
                    // formData.signId = this.userId
                    // formData.handSign = this.imgData
                    // let result = await HttpApi.SignConfrence.upload(formData)
                    // if (result.success) {
                    //     this.$store.commit('AUTO_HAND_SIGN', true);
                    //     this.$vux.confirm.show({
                    //         title: '系统提示',
                    //         content: '签字已完成',
                    //     });
                    // } else {
                    //     this.$vux.confirm.show({
                    //         title: '系统提示',
                    //         content: result.description,
                    //     });
                    // }
                } catch (e) {
                  alert(e.description)
                  // this.$vux.toast.text(e.description)
                }
            },
            getImageSize(img, limit) {
                let size = limit || 10;
                return new Promise((resolve, reject) => {
                    img.onload = (e) => {
                        let target = e.target || e.srcElement;
                        let width = target.width;
                        let height = target.height;
                        if (width < size && height < size) {
                            reject({
                                description: '签字太小了',
                            });
                        } else {
                            resolve();
                        }
                    };
                });
            }
        }
    }
</script>

<style scoped lang="less">
  .sign {
    padding: 20px;

    h1 {
      width: 55%;
      margin: 0 auto;
      font-size: 32px;
      text-align: center;
    }

    .signArea {
      width: 99%;
      height: 55vh;
      margin: 40px auto 40px;
      border: 1px dashed #Ec1C1C;
    }
    .signBtn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      button {
        width: 40%;
        height: 60px;
        border-radius: 10px;
        background: none;
      }
      .confireSign {
        background: rgb(22,155,213);
        border: 1px solid rgb(22,155,213);
        color: #ffffff;
      }
    }
  }
</style>
