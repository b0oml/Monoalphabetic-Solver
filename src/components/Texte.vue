<template>
<div class="text" @keydown="key" tabindex="1">
    <!-- <div class="tmp">Pos : {{this.pos}}</div> -->
    <Letter v-for="(l, i) in letters"
        :key="i"
        :pos="i"
        :lplain="l.plain"
        :lcipher="l.letter"
        :active="l.letter == currentLetter"
        :selected="i == pos"
        @click="clickLetter" />
</div>
</template>

<script>
import Letter from './Letter.vue'
export default {
    name: 'Texte',
    props: {
        text: {
            type: String,
            default: 'abcdefghijklmnopqrstuvwxyz'
        },
        sub: Object,
        currentLetter: String
    },
    data() {
        return {
            splittedText: this.text.split(''),
            pos: 0,
        }
    },
    computed: {
        letters() {
            return this.splittedText
                .map(x => ({
                    letter: x,
                    plain: this.sub[x] || x
                }) )
        }
    },
    methods: {
        clickLetter({pos}) {
            this.pos = pos;
            this.$emit('select', this.text[pos])
        },
        key({keyCode, key}) {
            if(keyCode == 37) { // Left
                this.pos = Math.max(0, this.pos - 1);
            } else if (keyCode == 38) { // Top
                //TODO
            } else if (keyCode == 39) { // Right
                this.pos = Math.min(this.text.length, this.pos + 1);
            } else if (keyCode == 40) { // Bottom
                //TODO
            } else {
                if (key.length == 1) { //&& /[a-zA-Z0-9-_ ]/.test(key)
                    this.$emit('change', {from: this.currentLetter, to: key})
                }
            }
            this.$emit('select', this.text[this.pos])
        }
    },
    components: {
        Letter
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text:focus {
    outline: none
}
</style>
