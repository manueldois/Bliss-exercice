<template>
  <div>
      <h1>Loading page</h1>
      <button @click="setOnline">Go online</button>
  </div>
</template>

<script>
import store from '../store'
export default {
    name: 'loading-page',
    methods: {
      setOnline: function(){
        store.setOnline()
      }
    }
}
</script>

<style scoped lang="scss">

</style>