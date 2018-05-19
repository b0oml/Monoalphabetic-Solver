<template>
<div :class="['text', 'active-'+currentLetter.charCodeAt(0)]" @keydown="key" tabindex="1">
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
import Letter from "./Letter.vue";

export default {
    name: "Texte",
    props: {
        text: {
            type: String,
            default: "abcdefghijklmnopqrstuvwxyz"
        },
        sub: Object,
        currentLetter: String
    },
    data() {
        return {
            pos: 0,
            splittedText: this.text.split("")
        };
    },
    watch: {
        text(val) {
            this.splittedText = val.split("");
        }
    },
    computed: {
        letters() {
            console.log("Letters");

            return this.splittedText.map(x => {
                if (x == " $") {
                    return {
                        cipher: "_",
                        plain: " "
                    };
                } else {
                    return {
                        cipher: x,
                        plain: this.sub[x] || x
                    };
                }
            });
        }
    },
    methods: {
        sendLetter() {
            let letter = this.splittedText[this.pos];
            if (letter == " $") letter = "_";
            this.$emit("select", letter);
        },
        clickLetter({ pos }) {
            this.pos = pos;
            this.sendLetter();
        },
        key(e) {
            const keyCode = e.keyCode;
            const key = e.key;
            // console.log(keyCode, key);

            if (keyCode >= 112 && keyCode <= 123) return; // Do nothing on Function key

            e.preventDefault();
            if (keyCode == 9) {
                this.splittedText.splice(this.pos, 0, " $");
                this.nextPos();
            } else if (keyCode == 8) {
                if (this.splittedText[this.pos] == " $")
                    this.splittedText.splice(this.pos, 1);
            } else if (keyCode == 37) {
                // Left
                this.prevPos();
            } else if (keyCode == 38) {
                // Top
                //TODO
            } else if (keyCode == 39) {
                // Right
                this.nextPos();
            } else if (keyCode == 40) {
                // Bottom
                //TODO
            } else {
                if (key.length == 1 && this.splittedText[this.pos] != " $") {
                    //&& /[a-zA-Z0-9-_ ]/.test(key)
                    this.$emit("change", { from: this.currentLetter, to: key });
                    this.nextPos();
                }
            }
            this.sendLetter();
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
