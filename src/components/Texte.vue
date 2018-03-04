<template>
<div class="text">
    <Letter v-for="l in text" :lplain="l" :lcipher="l"/>
</div>
</template>

<script>
import Letter from './Letter.vue'
export default {
    name: 'Texte',
    props: {
        text: String
    },
    data() {
        return {
            
        }
    },
    components: {
        Letter
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
