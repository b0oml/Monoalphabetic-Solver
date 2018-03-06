<template>
    <div class="decode container">
        <div id="left-side">
            <div id="informations" class="item">
                <span class="item-title">Informations</span>
                <ul>
                    <li><strong>IC :</strong> {{ ic }} ({{ detectedLanguage }})
                        <a href="https://www.dcode.fr/index-coincidence" class="tooltip preline" data-balloon=" Index of Coincidence is a cryptanalysis technique studying the probability of finding repeating letters in an encrypted text.
                        English : 0.0667
                        French : 0.0778" data-balloon-length="xlarge" data-balloon-pos="right">?</a>
                    </li>
                    <li><strong>Selected language :</strong> French</li>
                    <li><strong>Analysis time :</strong> 0.095 ms</li>
                    <li><strong>Copyright :</strong> LUX</li>
                </ul>
            </div>
            <div id="" class="item">
                <span class="item-title">Option Langue</span>
                <div class="item-content">
                    Options
                </div>
            </div>
            <div id="" class="item">
                <span class="item-title">Options alphabet</span>
                <div class="item-content">
                    Options
                </div>
            </div>
            <div class="item" id="debug">
                <span class="item-title">Debug</span>
                <div class="item-content">
                    <!-- <p>Letter: {{ currentLetter }}</p> -->
                </div>
            </div>
        </div>
        <div id="right-side">
            <div id="welcom" class="item">
                <span class="item-title">Welcom</span>
                <div class="item-content">
                    Monoalphabetic solver
                </div>
            </div>
            <div id="input" class="item">
                <span class="item-title">Cipher</span>
                <div class="item-content">
                    Input
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'Input',
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {

    },
    components: {
    }
}
</script>

<style scoped>

.container{
    display: flex;
    min-height: 100%;
}

#left-side, #right-side{
    flex-direction: column;
}

#left-side{
    z-index: 3;
    flex: 1;
    min-width: 300px;
    background-color: #ece4bc;
    box-shadow: 2px 0 5px rgb(236, 228, 188);
    border-right: 1px solid #e3d9aa;
}
#right-side{
    z-index: 1;
    flex: 3;
    padding-left: 8px;
    background-color: #f8f2d7;
}

.item{
    position: relative;
    background-color: #fff;
    flex: 1 100%;
    min-height: 30px;
    margin: 5px;
    padding: 0 20px 10px;
}
.item-title{
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    padding: 7px 0;
    border-bottom: 1px solid #f9f5dd;
    text-align: center;
    font-size: 12px;
    color: #c5b437;
    text-transform: uppercase;
}

#informations ul{
    font-size: 13px;
    color: #a29429;
    line-height: 19px;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
#informations ul strong{
    color: #d7b915;
    font-weight: 300;
}

.stickbar{
    position: absolute;
    top: 0;
    right: 0;
}
.stickbar-item{
    display: inline-block;
    font-size: 14px;
    padding: 6px 7px;
    cursor: pointer;
    color: #d8d2a7;
}
.stickbar-item:hover{
    background-color: #ece4bc;
    color: #fff;
}

.tooltip{
    display: inline-block;
    background-color: #ece4bc;
    margin-left: 4px;
    padding: 1px 4px 0;
    height: 16px;
    color: #fff;
    text-decoration: none;
}
.tooltip:hover{
    background-color: #e0d7af;
}
.preline[data-balloon]:after{
    white-space: pre-line !important;
}

.item-content {
    padding: 6px 8px;
}

#missing-letters-letters{
    background-color: #ffd1d1;
}
#multiple-letters-letters{
    background-color: #d1e7ff;
}
#biggest-words-letters{
    background-color: #FCF7E9;
}

#alphabet-letters{
    background-color: #FCF7E9;
}
#cipher-letters{
    background-color: #F9EFD3;
}

@media screen and (max-width: 860px) {
    .container{
        flex-direction: column;
    }
    #left-side{
        order: 2;
    }
}

.letter{
    vertical-align: top;
    display:inline-block;
    margin: -1px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    width: 12px;
    height: 20px;
    padding: 0px 3px 0px 3px;
    background: linear-gradient(#fcf8ea,#ffffff,#f8efd3);
    font: normal 12px/22px "Lucida Console", "Trebuchet MS", Arial, Helvetica, sans-serif;
    text-align: center;
    /* text-transform: uppercase; */
    color: #63562E;
    border: #D0BE90 solid 1px;
}
.letter:hover{
    font-weight: 700;
}
.letter-active {
    font-weight: 700;
    color: #d00;
}
</style>
