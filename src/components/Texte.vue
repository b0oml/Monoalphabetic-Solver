<template>
<div class="text" @keydown="key" tabindex="1">
    <div class="tmp">Pos : {{this.pos}}</div>
    <Letter v-for="l in letters"
        :key="l.id"
        :pos="l.id"
        :lplain="l.plain"
        :lcipher="l.letter"
        :active="l.active"
        :selected="l.selected"
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
        // sub: Object  // TODO sub in porps
    },
    data() {
        return {
            sub: { // TODO sub in props
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
            },
            splittedText: this.text.split(''),
            pos: 0,
        }
    },
    computed: {
        letters() {
            return this.splittedText
                .map((x, i) => ({
                    letter: x,
                    active: x == this.currentLetter,
                    id: i,
                    plain: this.sub[x],
                    selected: i == this.pos
                }) )
        },
        currentLetter() {
            return this.text[this.pos]
        }
    },
    methods: {
        clickLetter({pos}) {
            this.pos = pos;
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
                if (key.length == 1 && /[a-zA-Z0-9-_ ]/.test(key)) {
                    //TODO emit sub change
                    this.sub[this.currentLetter] = key;
                }
            }
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
