<template>
<div class="text" @keydown="key" tabindex="1">
    <!-- <div class="tmp">Pos : {{this.pos}}</div> -->
    <Letter v-for="(plain, cipher, i) in substitution"
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
import Vue from "vue";
import { mapGetters } from "vuex";

import Letter from "./LockableLetter.vue";

export default {
    name: "Alphabet",
    data() {
        const locked = {};
        for (let k in this.substitution) {
            locked[k] = false;
        }
        return {
            locked,
            pos: 0
        };
    },
    methods: {
        sendLetter() {
            let letter = this.keys[this.pos];
            this.$store.commit("setCurrentLetter", letter);
        },
        clickLetter({ pos }) {
            this.pos = pos;
            this.sendLetter();
        },
        key(e) {
            const keyCode = e.keyCode;
            const key = e.key;
            console.log(keyCode, key);

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
        toggleLock({ pos }) {
            console.log("Lock sub");
            let letter = Object.keys(this.substitution)[pos];
            Vue.set(this.locked, letter, !this.locked[letter]);
        }
    },
    computed: {
        ...mapGetters(["substitution", "currentLetter"]),
        keys() {
            return Object.keys(this.substitution);
        }
    },
    components: {
        Letter
    }
};
</script>
