<template>
  <div>
    <p>
      <router-link :to="{name:'elTable'}">ElementUi Test</router-link>
    </p>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
</style>
