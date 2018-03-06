<template>
<div class="text" @keydown="key" tabindex="1">
    <!-- <div class="tmp">Pos : {{this.pos}}</div> -->
    <Letter v-for="(plain, cipher, i) in sub"
        :key="i"
        :pos="i"
        :lplain="plain"
        :lcipher="cipher"
        :selected="i == pos"
        :locked="locked[cipher]"
        @lock="toggleLock"
        @click="clickLetter" />
</div>
</template>

<script>
import Letter from './LockableLetter.vue'
import Texte from './Texte.vue'

export default {
    name: 'Alphabet',
    extends: Texte,
    props: {
        sub: Object,
        locked: Object,
        currentLetter: String
    },
    methods: {
        sendLetter() {
            let letter = Object.keys(this.sub)[this.pos]
            this.$emit('select', letter)
        },
        key(e) {
            const keyCode = e.keyCode
            const key = e.key
            console.log(keyCode, key);

            if(keyCode >= 112 && keyCode <= 123) return // Do nothing on Function key

            e.preventDefault();
            if(keyCode == 37) { // Left
                this.pos = Math.max(0, this.pos - 1);
            } else if (keyCode == 39) { // Right
                this.pos = Math.min(this.splittedText.length, this.pos + 1);
            } else {
                if (key.length == 1) { //&& /[a-zA-Z0-9-_ ]/.test(key)
                    this.$emit('change', {from: this.currentLetter, to: key})
                }
            }
            this.sendLetter()
        },
        toggleLock({pos}) {
            let letter = Object.keys(this.sub)[pos]
            this.$emit('lock', {from: letter})
        }
    },
    components: {
        Letter
    }
}
</script>
