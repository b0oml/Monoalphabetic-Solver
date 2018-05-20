<template>
<div :class="['text', 'active-'+currentLetter.charCodeAt(0)||'0']" @keydown="key" tabindex="1">
    <!-- <div class="tmp">Pos : {{this.pos}}</div> -->
    <Letter v-for="(l, i) in letters"
        :key="i"
        :pos="i"
        :lplain="l.plain"
        :lcipher="l.cipher"
        :selected="i == pos"
        @click="clickLetter" />
</div>
</template>

<script>
import { mapGetters } from "vuex";

import Letter from "./Letter.vue";

export default {
    name: "Texte",
    props: {
        text: String
    },
    data() {
        return {
            pos: 0
        };
    },
    computed: {
        ...mapGetters(["currentLetter", "substitution"]),
        splittedText() {
            return this.text.split("");
        },
        letters() {
            return this.splittedText.map(x => {
                return {
                    cipher: x,
                    plain: this.substitution[x] || x
                };
            });
        }
    },
    methods: {
        sendLetter() {
            const letter = this.splittedText[this.pos];
            this.$store.commit("setCurrentLetter", letter);
        },
        clickLetter({ pos }) {
            if (this.pos != pos) {
                this.pos = pos;
                this.sendLetter();
            }
        },
        key(e) {
            const keyCode = e.keyCode;
            const key = e.key;
            // console.log(keyCode, key);

            if (keyCode >= 112 && keyCode <= 123) return; // Do nothing on Function key

            e.preventDefault();
            if (keyCode == 37) {
                // Left
                this.prevPos();
                this.sendLetter();
            } else if (keyCode == 38) {
                // Top
                //TODO
            } else if (keyCode == 39) {
                // Right
                this.nextPos();
                this.sendLetter();
            } else if (keyCode == 40) {
                // Bottom
                //TODO
            } else {
                if (key.length == 1) {
                    //&& /[a-zA-Z0-9-_ ]/.test(key)
                    this.$store.commit("changeSub", {
                        from: this.currentLetter,
                        to: key
                    });
                    this.sendLetter();
                }
            }
        },
        nextPos() {
            this.pos = Math.min(this.splittedText.length - 1, this.pos + 1);
        },
        prevPos() {
            this.pos = Math.max(0, this.pos - 1);
        }
    },
    components: {
        Letter
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text:focus {
    outline: none;
}
</style>
