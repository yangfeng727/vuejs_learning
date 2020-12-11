<!--签字面板，宽高以父级盒子为准-->
<!--注意：页面resize将清空当前画布区域-->
<template>
  <canvas style="width:100%; height: 100%;"></canvas>
</template>

<script>
  export default {
    name: 'draw',
    data() {
      return {
        resizeTimer: null,
        canvasObj: null,
        cxt: null,
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        point: {x: 0, y: 0},
        minPoint: {x: null, y: null},
        maxPoint: {x: 0, y: 0},
        isMobile: true,
        pressed: false,
        devicePixelRatio: 0,
        orientation: window.matchMedia('(orientation: portrait)'),
      };
    },
    watch: {
      point: {
        handler(val) {
          let w = this.width, h = this.height;
          if (val.x > w || val.y > h || val.x < 0 || val.y < 0) return;
          this.minPoint.x = this.minPoint.x > val.x ? val.x : this.minPoint.x;
          this.minPoint.y = this.minPoint.y > val.y ? val.y : this.minPoint.y;
          this.maxPoint.x = this.maxPoint.x < val.x ? val.x : this.maxPoint.x;
          this.maxPoint.y = this.maxPoint.y < val.y ? val.y : this.maxPoint.y;
          return;
        },
        deep: true,
      },
    },
    mounted() {
      // setTimeout针对页面rem计算造成抖动，初始计算宽高等错误的处理----这里只是大概处理
      setTimeout(() => {
        this.initCanvas();
      }, 500)

      window.addEventListener('resize', this.resizeDom, false)
    },
    methods: {
      // 当前是否pc版本
      IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
          "SymbianOS", "Windows Phone",
          "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      },
      resizeDom() {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer)
          this.resizeTimer = null
        }
        this.resizeTimer = setTimeout(() => {
          this.initCanvas()
        })
      },
      // 获取父节点信息，用于获取left，top，width, height等信息
      getParentInfo() {
        let dom = this.$el.parentNode
        let obj = dom.getBoundingClientRect()
        return {
          obj,
          offsetTop:dom.offsetTop,
          offsetLeft:dom.offsetLeft,
        }
      },
      initCanvas() {
        this.isMobile = !this.IsPC()
        this.canvasObj = this.$el;
        this.cxt = this.canvasObj.getContext('2d');
        // let {top, left, width, height} = document.documentElement.getBoundingClientRect();
        let {offsetTop, offsetLeft, obj} = this.getParentInfo();
        let width=obj.width
        let height=obj.height
        let devicePixelRatio = this.devicePixelRatio = devicePixelRatio = window.devicePixelRatio;
        this.top = offsetTop;
        this.left = offsetLeft;
        this.width = width;
        this.height = height;
        this.minPoint = {x: width, y: height};

        // this.isMobile && this.orientation.addListener(() => setTimeout(this.initCanvas.bind(this), 0));

        // if (devicePixelRatio) {
        //   this.canvasObj.style.width = `${width}px`;
        //   this.canvasObj.style.height = `${height}px`;
        //   this.canvasObj.width = width;
        //   this.canvasObj.height = height;
        //   // this.cxt.scale(devicePixelRatio, devicePixelRatio);
        // } else {
        //   this.canvasObj.height = height;
        //   this.canvasObj.width = width;
        // }

        this.canvasObj.style.width = `${width}px`;
        this.canvasObj.style.height = `${height}px`;
        this.canvasObj.width = width;
        this.canvasObj.height = height;

        //移动端去掉模糊提高手写渲染速度
        if (this.isMobile) {
          this.cxt.shadowBlur = 1;
          this.cxt.shadowColor = '#000000';
        }

        this.cxt.strokeStyle = '#000000';
        this.cxt.lineWidth = 2;
        this.cxt.lineCap = 'round';
        this.cxt.lineJoin = 'round';
        this._bind();
      },
      removeEvent() {
        this.canvasObj.removeEventListener('touchstart', this.touchstartHandler, false);
        this.canvasObj.removeEventListener('touchmove', this.touchmoveHandler, false);
        this.canvasObj.removeEventListener('touchend', this.touchendHandler, false);
        this.canvasObj.removeEventListener('mousedown', this.touchstartHandler, false);
        this.canvasObj.removeEventListener('mousemove', this.touchmoveHandler, false);
        this.canvasObj.removeEventListener('mouseup', this.touchendHandler, false);
        this.canvasObj.removeEventListener('mouseleave', this.touchendHandler, false);
      },
      _bind() {
        this.removeEvent()
        if (this.isMobile) {
          this.canvasObj.addEventListener('touchstart', this.touchstartHandler, false);
          this.canvasObj.addEventListener('touchmove', this.touchmoveHandler, false);
          this.canvasObj.addEventListener('touchend', this.touchendHandler, false);
        } else {
          this.canvasObj.addEventListener('mousedown', this.touchstartHandler, false);
          this.canvasObj.addEventListener('mousemove', this.touchmoveHandler, false);
          this.canvasObj.addEventListener('mouseup', this.touchendHandler, false);
          this.canvasObj.addEventListener('mouseleave', this.touchendHandler, false);
        }
      },
      // 结束
      touchendHandler: function (e) {
        e.preventDefault();
        this.pressed = false;
      },
      // 移动
      touchmoveHandler: function (e) {
        e.preventDefault();
        if (!this.pressed) return;
        let x, y;
        if (e.changedTouches) {
          x = e.changedTouches[0].pageX;
          y = e.changedTouches[0].pageY;
        } else {
          x = e.offsetX + e.target.offsetLeft;
          y = e.offsetY + e.target.offsetTop;
        }

        this.point = {x: x - this.left, y: y - this.top};
        this.paint(2);
      },
      // 开始
      touchstartHandler: function (e) {

        // 重新获取left，top 避免页面初始加载时获取的误差（误差来源：rem换算造成的页面抖动）
        let {offsetLeft, offsetTop} = this.getParentInfo()
        this.left = offsetLeft
        this.top = offsetTop

        e.preventDefault();
        this.pressed = true;
        let x, y;
        if (e.changedTouches) {
          x = e.changedTouches[0].pageX;
          y = e.changedTouches[0].pageY;
        } else {
          x = e.offsetX + e.target.offsetLeft;
          y = e.offsetY + e.target.offsetTop;
        }
        console.log('pageX:',x,'pageY:',y)
        console.log('left:',this.left,'top:',this.top)

        this.point = {x: x - this.left, y: y - this.top};

        this.paint(1);
      },
      // 画图
      paint(signal) {
        switch (signal) {
          case 1:
            this.cxt.beginPath();
            this.cxt.moveTo(this.point.x, this.point.y);
          case 2:
            this.cxt.lineTo(this.point.x, this.point.y);
            this.cxt.stroke();
            break;
          default:
        }
      },
      // 清空
      clear() {
        this.cxt.clearRect(0, 0, this.width, this.height);
      },
      getPNGImg() {
        let canvas = this.cropCanvas();
        // if (this.isMobile && this.height > this.width) {
        //   let canvas1 = document.createElement('canvas'), cxt1 = canvas1.getContext('2d');
        //   canvas1.width = canvas.height;
        //   canvas1.height = canvas.width;
        //   let xpos = canvas1.width / 2, ypos = canvas1.height / 2;
        //   cxt1.translate(xpos, ypos);
        //   cxt1.rotate(-90 * Math.PI / 180);
        //   cxt1.translate(-xpos, -ypos);
        //   cxt1.drawImage(canvas, xpos - canvas.width / 2, ypos - canvas.height / 2);
        //
        //   return this.isCanvasBlank(canvas1) ? null : canvas1.toDataURL('image/png');
        // }
        return this.isCanvasBlank(canvas) ? null : canvas.toDataURL('image/png');
      },
      isCanvasBlank(canvas) {
        var blank = document.createElement('canvas');//系统获取一个空canvas对象
        blank.width = canvas.width;
        blank.height = canvas.height;
        return canvas.toDataURL() === blank.toDataURL();//比较值相等则为空
      },
      // 裁剪
      cropCanvas() {
        let w = this.maxPoint.x - this.minPoint.x;
        let h = this.maxPoint.y - this.minPoint.y;
        let newCanvas = document.createElement('canvas');
        let newCxt = newCanvas.getContext('2d');
        newCanvas.width = w + 2;
        newCanvas.height = h + 2;
        newCxt.backgroundAlpha = 0;
        let imgData = this.cxt.getImageData(this.minPoint.x - 1, this.minPoint.y - 1, newCanvas.width,
          newCanvas.height);
        newCxt.putImageData(imgData, 0, 0);
        return newCanvas;
      },
    },
    beforeDestroy() {
      this.resizeTimer && clearTimeout(this.resizeTimer)
      window.removeEventListener('resize', this.resizeDom, false)
      this.removeEvent()
      this.orientation.removeListener(() => {
      });
    },
  };
</script>

<style scoped>
  canvas {
    width: 100%;
    height: 100%;
    cursor: crosshair;
  }
</style>
