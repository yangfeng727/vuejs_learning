# vue学习
## 1.vue懒加载[参考教程](https://blog.csdn.net/qq_37540004/article/details/78727063)
 1.方式1
![图片显示不出来请查看教程](./imgs/1.png)

 2.方式2 [当前项目的使用方式]
```
...

const Index=(resolve) => require(['../components/index/index'], resolve) // 这里是你的模块 不用import去引入了

const router = new Router({
    routes: [
		 {
		       path: '/index',
		       component: Index
		   }
	]
})
...
```
3.方式3
```
// r就是resolve
const list = r => require.ensure([], () => r(require('../components/list/list')), 'list');
// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 
const router = new Router({
    routes: [
		{
		   path: '/list/blog',
		   component: list,
		   name: 'blog'
		}
	]
})
```
## 2.关于vue methods
在vue 方法中，若有a,b 两个data里面的变量，当其中任意一个发生变化时都会重新执行当前方法！！！！！！！

## 3.vue的动态路径
```$xslt
1、绝对路径访问
把图片放到静态资源目录static目录下（build 会将static目录中的文件或者文件夹按照原本的结构放在dist目录下），并用/static绝对路径访问：
<template>
    <div>
        <img :src="src" alt="图片" />
    </div>
</template>
<script>
    export default{
        data(){
          return {
              src:`/static/img/user.png`
          }
        }
    }
</script>

2、使用require
如果想在不调整目录结构的情况下读取图片，还可以使用require：

data(){
     return {
         src:require('../assets/user.png')    //重点看这里
    }
}

3、使用import
也可以用import引入图片路径：
<template>
    <div>
        <img :src="src" alt="图片" />
    </div>
</template>
<script>
    import userPath from '../assets/user.png'
    export default{
        data(){
          return {
              src:userPath 
          }
        }
    }
</script>

```
## 闪汇项目遇到一个问题，这里写下总结
#### 问题场景：使用el-tabs组件，每个panel里面有个分页，分页组件改变页码时，地址栏改变，照成tab里所有的分页都重新获取了一下数据，显示错误。  
#### 问题分析：
1.首先tab组件的panel之间应该没有任何关联，只是显示隐藏而已，问题不在tab组件而在分页组件。  
2.查看唐哥分页组件源码，发现更改地址栏时有个监听，地址变化则执行子组件的fetchData方法，问题在于每个子组件都有该方法。关系为  

```angular2
                                    ---》子组件（this.fetchData）
父组件1（this）-》 ....父组件（this）
                                    ---》子组件（this.fetchData）
分页组件调用父组件1的this.fetchData没有，应该时递归调用了子组件的this.fetchData，造成了每个含有改方法的组件都重新执行了一次，而且参数还不对。

```         
最后解决办法：  
1.分页时，不改变地址栏  
2.将需要改变的子组件this传递到分页组件

## 在使用vue+vant开发html5项目时，需要rem适配 [参考地址](https://www.cnblogs.com/skylineStar/p/10036525.html)
### 方法：
1.和之前在main.js写js控制根font-size，并在样式中使用rem适配不同
2.项目中安装lib-flexible
```angular2
一、项目中安装lib-flexible

npm install lib-flexible --save
二、在项目的入口main.js文件中引入lib-flexible

import 'lib-flexible'
``` 
2.安装postcss-px2rem-exclude
```angular2
// postcss.config.js

module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px2rem-exclude": {
      remUnit: 75,
      exclude: /node_modules|folder_name/i
    }
  }
};
```


最后需要注意的是，使用lib-flexible和postcss-px2rem 和 使用 lib-flexible 和 px2rem-loader 自动转换两种方式都
造成了页面组件中的样式都变小了，所以使用postcss-px2rem-exclude

## vue pc 端rem适配方案[参考地址](https://blog.csdn.net/MrzhangxianshengJS/article/details/84562547)
利用px2rem-loader和lib-flexible实现PC端大屏项目的全自动开发,需要注意的是，由于lib-flexible不支持pc端，需要下载到本地，更改下源码，实现根据浏览器大小动态改变rem（相当于之前自己写的resize方法重新计算rem值）

## vue elementui表单验证
```
// 验证模板名称
this.$refs['contForm'].clearValidate();
let validForm = true;
let validFormListTab = this.$refs.contForm;
validFormListTab.validate(() => {});
try {

  const fields = validFormListTab.fields;
  if (fields) {
    fields.forEach(element => {
      if (element.prop !== '' && element.validateState === 'error') {
        throw new Error('validFails');
      }
    });
  }
} catch (error) {
  validForm = false;
}
```
