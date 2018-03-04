<template>
  <div id="app">
    <div class="tmp">Work in progress!</div>
    <Letter lcipher='a' lplain='b'></Letter>
    <Letter lcipher='a' lplain='b'></Letter>
    <Letter lcipher='a' lplain='b'></Letter>
    <Letter lcipher='a' lplain='b'></Letter>
  </div>
</template>

<script>
import Letter from './components/Letter.vue'

export default {
  name: 'app',
  components: {
    Letter
  }
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
</style>
