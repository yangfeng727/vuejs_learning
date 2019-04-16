import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const Page = resolve => require(['../components/page/Page'], resolve)
const testStore = resolve => require(['../components/testStore/TestStore'], resolve)

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
      path: '/testStore',
      name: 'testStore',
      component: testStore
    }
  ]
})
