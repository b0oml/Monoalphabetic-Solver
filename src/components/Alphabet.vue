<template>
<div class="text" @keydown="key" tabindex="1">
    <Letter v-for="(plain, cipher) in substitution"
        :key="cipher"
        :lcipher="cipher"
        :lplain="plain"
        :selected="currentLetter == cipher"
        :locked="locked[cipher]"
        @lock="toggleLock"
        @click="clickLetter" />
</div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

import Letter from "./LockableLetter.vue";

export default {
    name: "Alphabet",
    methods: {
        clickLetter({ cipher }) {
            this.$store.commit("setCurrentLetter", cipher);
        },
        key(e) {
            const keyCode = e.keyCode;
            const key = e.key;
            // console.log(keyCode, key);

            if (keyCode >= 112 && keyCode <= 123) return; // Do nothing on Function key

            e.preventDefault();
            if (keyCode == 37) {
                // Left
                this.pos--;
                if (this.pos < 0) {
                    this.pos = 0;
                } else {
                    this.sendLetter();
                }
            } else if (keyCode == 39) {
                // Right
                this.pos++;
                if (this.pos >= this.keys.length) {
                    this.pos = this.keys.length - 1;
                } else {
                    this.sendLetter();
                }
            } else {
                if (key.length == 1) {
                    //&& /[a-zA-Z0-9-_ ]/.test(key)
                    this.$store.commit("changeSub", {
                        from: this.currentLetter,
                        to: key
                    });
                }
            }
        },
        toggleLock({ cipher }) {
            this.$store.commit("toggleLock", cipher);
        }
    },
    computed: {
        ...mapGetters(["substitution", "currentLetter", "locked"])
    },
    components: {
        Letter
    }
};
</script>
