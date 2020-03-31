<template>
  <div>
    排序
    <draggable v-model="groups" @chang="change" @start="start" @end="end" :move="move">
      <!-- <transition-group> -->
      <div v-for="(item, index) in groups" :key=index>
        item {{item}}
      </div>
      <!-- </transition-group> -->
    </draggable>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'HelloWorld',
    components: {
      draggable
    },
    data () {
      return {
        groups: [
          1, 2, 3, 4, 5
        ]
      }
    },
    methods: {
      change (event) {
        console.log('change', event)
      },
      start (event) {
        console.log('start', event)
      },
      end (event) {
        console.log('end', event, this.groups)
      },
      move (event, orgin) {
        console.log('move', event, orgin)
      }
    }
  }
</script>

<style scoped>

</style>
