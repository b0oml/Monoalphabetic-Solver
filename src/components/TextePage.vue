<template>
<div :class="['text', 'active-'+currentLetter.charCodeAt(0)]" @keydown="key" tabindex="1">
    <!-- <div class="tmp">Pos : {{this.pos}}</div> -->
    <div v-if="maxPage">
        <button @click="changePage(-1)">Prev</button>
        <span>Page {{page+1}} / {{maxPage+1}}</span>
        <button @click="changePage(1)">Next</button>
    </div>
    <div>
        <Letter v-for="(l, i) in paginate(letters)"
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
import Letter from './Letter.vue'
import Texte from './Texte.vue'
export default {
    name: 'Texte',
    extends: Texte,
    data() {
        return {
            page: 0,
            pageSize: 1000,
        }
    },
    computed: {
        maxPage() {
            if(this.splittedText == undefined) return 1
            return Math.floor(this.splittedText.length / this.pageSize)
        }
    },
    methods: {
        changePage(val) {
            this.page = Math.max(Math.min(this.page + val, this.maxPage), 0)
        },
        paginate(list) {
            return list.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize)
        },
        nextPos() {
            this.pos = Math.min(this.splittedText.length - (this.page * this.pageSize) - 1, this.pageSize - 1, this.pos + 1)
            // this.pos = this.pos + 1
            // if(this.pos >= this.pageSize) {
            //     this.changePage(1)
            //     this.pos = 0
            // }
        },
        // prevPos() {
        //     this.pos = this.pos - 1
        //     if(this.pos < 0) {
        //         this.changePage(-1)
        //         this.pos = this.pageSize - 1//TODO work in last page
        //     }
        // }
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
