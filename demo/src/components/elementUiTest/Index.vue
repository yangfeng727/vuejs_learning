<template>
  <div>
    <p>
      <router-link :to="{name:'elTable'}">ElementUi Test</router-link>
      <router-link :to="{name:'elUpload'}">ElementUi upload</router-link>
      <router-link :to="{name:'richText'}">RichTextEditor</router-link>
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
