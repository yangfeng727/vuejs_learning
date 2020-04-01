import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Page = resolve => require(['../components/page/Page'], resolve)
const StoreIndex = resolve => require(['../components/testStore/Index'], resolve)
const testStore = resolve => require(['../components/testStore/TestStore'], resolve)
const TestStoreModule = resolve => require(['../components/testStore/TestStoreModule'], resolve)

// axios 测试
const AxiosTest1 = resolve => require(['@/components/axiosTest/AxiosTest1'], resolve)
// element测试
const ElIndex = resolve => require(['@/components/elementUiTest/Index'], resolve)
const ElTable = resolve => require(['@/components/elementUiTest/Table'], resolve)
const ElUpload = resolve => require(['@/components/elementUiTest/Upload'], resolve)
const RichText = resolve => require(['@/components/elementUiTest/RichText'], resolve)
// echarts
const ChartIndex = resolve => require(['@/components/echarts/Index'], resolve)
// vue render函数使用
const RenderIndex = resolve => require(['@/components/render/Index'], resolve)
// vue 排序拖拽组件
const DraggableIndex = resolve => require(['@/components/draggable/Index'], resolve)
// vue 轮播图
const SwiperIndex = resolve => require(['@/components/swiper/Index'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page',
      name: 'page',
      component: Page
    },
    {
      path: '/storeIndex',
      name: 'storeIndex',
      component: StoreIndex,
      children: [{
        path: '/testStore',
        name: 'testStore',
        component: testStore
      }, {
        path: '/testStoreModule',
        name: 'testStoreModule',
        component: TestStoreModule
      }]
    },
    {
      path: '/axiosTest1',
      name: 'AxiosTest1',
      component: AxiosTest1
    },
    {
      path: '/elIndex',
      name: 'elIndex',
      component: ElIndex,
      children: [{
        path: '/elTable',
        name: 'elTable',
        component: ElTable
      }, {
        path: '/elUpload',
        name: 'elUpload',
        component: ElUpload
      }, {
        path: '/richText',
        name: 'richText',
        component: RichText
      }]
    },
    {
      path: '/chartIndex',
      name: 'chartIndex',
      component: ChartIndex
    },
    {
      path: '/renderIndex',
      name: 'renderIndex',
      component: RenderIndex
    },
    {
      path: '/draggableIndex',
      name: 'draggableIndex',
      component: DraggableIndex
    },
    {
      path: '/swiperIndex',
      name: 'swiperIndex',
      component: SwiperIndex
    }
  ]
})
