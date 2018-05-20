<template>
<div :class="['text', 'active-'+currentLetter.charCodeAt(0)||'0']" @keydown="key" tabindex="1">
    <!-- <div class="tmp">Pos : {{this.pos}}</div> -->
    <div v-if="maxPage">
        <button @click="changePage(-1)">Prev</button>
        <span>Page {{page+1}} / {{maxPage+1}}</span>
        <button @click="changePage(1)">Next</button>
    </div>
    <div>
        <Letter v-for="(l, i) in lettersPaged"
            :key="i"
            :pos="i"
            :lplain="l.plain"
            :lcipher="l.cipher"
            :selected="i == pos"
            @click="clickLetter"/>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

import Letter from "./Letter.vue";

export default {
    name: "TextePage",
    data() {
        return {
            page: 0,
            pageSize: 1000,
            pos: 0
        };
    },
    computed: {
        ...mapGetters(["currentLetter", "substitution", "splittedText"]),
        maxPage() {
            if (this.splittedText == undefined) return 1;
            return Math.floor(this.splittedText.length / this.pageSize);
        },
        lettersPaged() {
            return this.splittedText
                .map(x => {
                    return {
                        cipher: x,
                        plain: this.substitution[x] || x
                    };
                })
                .slice(
                    this.page * this.pageSize,
                    (this.page + 1) * this.pageSize
                );
        }
    },
    methods: {
        sendLetter() {
            let offset = this.pageSize * this.page;
            const letter = this.splittedText[offset + this.pos];
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
            if (keyCode == 9) {
                this.$store.dispatch("addFake", this.pos);
                this.nextPos();
            } else if (keyCode == 8) {
                this.$store.dispatch("removeFake", this.pos);
            } else if (keyCode == 37) {
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
                    this.nextPos();
                    this.sendLetter();
                }
            }
        },
        changePage(val) {
            this.page = Math.max(Math.min(this.page + val, this.maxPage), 0);
        },
        nextPos() {
            this.pos = Math.min(
                this.splittedText.length - this.page * this.pageSize - 1,
                this.pageSize - 1,
                this.pos + 1
            );
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
.text {
    will-change: auto;
}
</style>
