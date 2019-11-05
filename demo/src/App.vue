<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="app-link">
      <router-link :to="{name:'HelloWorld'}">HelloWorld</router-link>
      <router-link :to="{name:'page'}">page</router-link>
      <router-link :to="{name:'storeIndex'}">storeIndex</router-link>
      <router-link :to="{name:'AxiosTest1'}">AxiosTest1</router-link>
      <router-link :to="{name:'elTable'}">ElementUi Test</router-link>
      <router-link :to="{name:'chartIndex'}">echarts</router-link>
      <router-link :to="{name:'renderIndex'}">vue Render函数使用案例</router-link>
    </div>
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .app-link {
    overflow: hidden;
  }

  .app-link > a {
    background: #ffdbc3;
    padding: 5px;
    border-radius: 5px;
  }

  .app-content {
    padding-top: 20px;
  }
</style>
