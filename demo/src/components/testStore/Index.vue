<template>
  <div class="test">
    <h1>{{msg}}</h1>
    <p>
      <router-link :to="{name:'testStore'}">testStore</router-link>
      <router-link :to="{name:'testStoreModule'}">testStoreModule</router-link>
    </p>
    <div class="box-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'vuex store'
    }
  }
}
</script>
<style scoped lang="less">
</style>
