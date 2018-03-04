<template>
  <div id="app">
    <div class="tmp">Work in progress!</div>
    <Texte :sub="sub"/>
    <Texte text="test de text blablabi" :sub="sub"/>
  </div>
</template>

<script>
import Letter from './components/Letter.vue'
import Texte from './components/Texte.vue'

export default {
  name: 'app',
  components: {
    Letter,
    Texte
  },
  data() {
    return {
      sub: {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j',
        k: 'k',
        l: 'l',
        m: 'm',
        n: 'n',
        o: 'o',
        p: 'p',
        q: 'q',
        r: 'r',
        s: 's',
        t: 't',
        u: 'u',
        v: 'v',
        w: 'w',
        x: 'x',
        y: 'y',
        z: 'z',
      }
    }
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
