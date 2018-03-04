<template>
  <div id="app">
    <Decode/>
  </div>
</template>

<script>
import Letter from './components/Letter.vue'
import Texte from './components/Texte.vue'
import Decode from './components/Decode.vue'

export default {
  name: 'app',
  components: {
    Letter,
    Texte,
    Decode,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');

html, body{
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
}

#app {
}
</style>
