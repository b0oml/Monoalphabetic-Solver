<template>
<div class="text" @keydown="key" tabindex="1">
    <!-- <div class="tmp">Pos : {{this.pos}}</div> -->
    <Letter v-for="(l, i) in letters"
        :key="i"
        :pos="i"
        :lplain="l.plain"
        :lcipher="l.cipher"
        :active="l.cipher == currentLetter"
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
            pos: 0,
        }
    },
    computed: {
        splittedText() {
            return this.text.split('')
        },
        letters() {
            return this.splittedText
                .map(x => {
                    if(x == ' $') {
                        return {
                            cipher: '_',
                            plain: ' '
                        }
                    } else {
                        return {
                            cipher: x,
                            plain: this.sub[x] || x
                        }
                    }
                })
        }
    },
    methods: {
        sendLetter() {
            let letter = this.splittedText[this.pos]
            if(letter == ' $') letter = ' '
            this.$emit('select', letter)
        },
        clickLetter({pos}) {
            this.pos = pos
            this.sendLetter()
        },
        key(e) {
            const keyCode = e.keyCode
            const key = e.key
            // console.log(keyCode, key);
            
            if(keyCode >= 112 && keyCode <= 123) return // Do nothing on Function key

            e.preventDefault();
            if(keyCode == 9) {
                this.splittedText.splice(this.pos, 0, ' $')
                this.pos++
            } else if(keyCode == 8) {
                if(this.splittedText[this.pos] == ' $')
                    this.splittedText.splice(this.pos, 1)
            } else if(keyCode == 37) { // Left
                this.pos = Math.max(0, this.pos - 1);
            } else if (keyCode == 38) { // Top
                //TODO
            } else if (keyCode == 39) { // Right
                this.pos = Math.min(this.splittedText.length, this.pos + 1);
            } else if (keyCode == 40) { // Bottom
                //TODO
            } else {
                if (key.length == 1) { //&& /[a-zA-Z0-9-_ ]/.test(key)
                    this.$emit('change', {from: this.currentLetter, to: key})
                    this.pos++
                }
            }
            this.sendLetter()
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
