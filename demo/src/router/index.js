import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Page = resolve => require(['../components/page/Page'], resolve)
const StoreIndex = resolve => require(['../components/testStore/Index'], resolve)
const testStore = resolve => require(['../components/testStore/TestStore'], resolve)
const TestStoreModule = resolve => require(['../components/testStore/TestStoreModule'], resolve)

// axios 测试
const AxiosTest1 = resolve => require(['@/components/axiosTest/AxiosTest1'], resolve)
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
    }
  ]
})
