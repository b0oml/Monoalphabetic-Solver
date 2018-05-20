<template>
    <div class="decode container">
        <div id="left-side">
            <div class="back-button" >
                <button @click="back">Back</button>
            </div>
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
                </ul>
                <a href="https://en.wikipedia.org/wiki/Polyalphabetic_cipher" v-if="ic < 0.05 && text.length > 10">
                    <div class="warning" data-balloon="A cipher is detected as polyalphabetic when IC is lower than 0.05.
                    For information, the IC of a random text is 0.0385." data-balloon-length="large" data-balloon-pos="right">
                        Warning! Polyalphabetic detected
                    </div>
                </a>
            </div>
            <div id="missing-letters" class="item">
                <span class="item-title">Missing letters in alphabet</span>
                <div class="item-content" id="missing-letters-letters">
                    <div v-for="l in missingLetters" :key="l" :class="{'letter': true, 'letter-active': l == currentLetter}">{{ l }}</div>
                    <div v-if="!missingLetters.length" class="noletter">
                        No missing letters
                    </div>
                </div>
            </div>
            <div id="multiple-letters" class="item">
                <span class="item-title">Multiple letters in alphabet</span>
                <div class="item-content" id="multiple-letters-letters">
                    <Texte :text="multipleLetters"/>
                    <div v-if="!multipleLetters.length" class="noletter">
                        No multiple letters
                    </div>
                </div>
            </div>
            <div id="biggest-words" class="item">
                <span class="item-title">Biggest words</span>
                <div class="item-content" id="biggest-words-letters">
                </div>
            </div>
            <div class="item" id="debug">
                <span class="item-title">Debug</span>
                <div class="item-content">
                    <p>Letter: {{ currentLetter }}</p>
                </div>
            </div>
        </div>
        <div id="right-side">
            <div id="alphabet" class="item">
                <span class="item-title">Alphabet</span>
                <div class="item-content" id="alphabet-letters">
                    <Alphabet/>
                    <div class="buttons">
                        <button @click="actionAuto">Auto</button>
                        <button @click="actionRandom">Random</button>
                    </div>
                </div>
                <div class="stickbar">
                    <span class="stickbar-item" data-balloon="Copy the decrypted alphabet"  data-balloon-pos="left"
                        v-clipboard:copy="alphabetText"
                        v-clipboard:success="copySucced"
                        v-clipboard:error="copyError">Copy</span>
                </div>
            </div>
            <div id="cipher" class="item">
                <span class="item-title">Cipher</span>
                <div class="item-content" id="cipher-letters">
                    <TextePage :text="text"/>
                </div>
                <div class="stickbar">
                    <span class="stickbar-item" data-balloon="Copy the decrypted text" data-balloon-length="medium" data-balloon-pos="left"
                        v-clipboard:copy="plainText"
                        v-clipboard:success="copySucced"
                        v-clipboard:error="copyError">Copy</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import Texte from "./Texte.vue";
import TextePage from "./TextePage.vue";
import Alphabet from "./Alphabet.vue";

export default {
    name: "Decode",
    computed: {
        ...mapGetters([
            "text",
            "currentLetter",
            "ic",
            "detectedLanguage",
            "multipleLetters",
            "missingLetters",
            "plainText",
            "alphabetText"
        ])
    },
    methods: {
        copySucced() {
            // Toast
            this.$toasted.show("Copied in clipboard", {
                theme: "primary",
                position: "bottom-right",
                duration: 2000
            });
        },
        copyError() {
            // Toast
            this.$toasted.show("Failed to copy in clipboard", {
                theme: "primary",
                type: "error",
                position: "bottom-right",
                duration: 2000
            });
        },
        actionAuto() {
            console.log("Sub auto");
        },
        actionRandom() {
            console.log("Sub random");
        },
        back() {
            this.$store.commit("setPage", 0);
        }
    },
    components: {
        Texte,
        Alphabet,
        TextePage
    }
};
</script>

<style scoped>
#missing-letters-letters {
    background-color: #ffd1d1;
}
#multiple-letters-letters {
    background-color: #d1e7ff;
}
#biggest-words-letters {
    background-color: #fcf7e9;
}

#alphabet-letters {
    display: flex;
    background-color: #fcf7e9;
}
#cipher-letters {
    background-color: #f9efd3;
}

.letter {
    vertical-align: top;
    display: inline-block;
    margin: -1px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    width: 12px;
    height: 20px;
    padding: 0px 3px 0px 3px;
    background: linear-gradient(#fcf8ea, #ffffff, #f8efd3);
    font: normal 12px/22px "Lucida Console", "Trebuchet MS", Arial, Helvetica,
        sans-serif;
    text-align: center;
    /* text-transform: uppercase; */
    color: #63562e;
    border: #d0be90 solid 1px;
}
.letter:hover {
    font-weight: 700;
}
.letter-active {
    font-weight: 700;
    color: #d00;
}
.back-button {
    margin: 5px;
    /* box-sizing: border-box; */
    /* width: 100%; */
}
.back-button button {
    width: 100%;
    padding: 5px 0;
    background-color: #bab185;
    border: 0;
    color: #fff;
    cursor: pointer;
}
.back-button button:before {
    content: "⬅ ";
    position: relative;
    top: 1px;
    font-size: 16px;
}
.back-button button:hover {
    background-color: #cbc194;
}
.warning {
    margin-top: 5px;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
    /* background-color: #ff9d5e; */
    border: 1px solid #ffddc7;
    color: #ff9d5e;
}

.noletter {
    font-size: 14px;
    text-align: center;
}
#missing-letters-letters .noletter {
    color: #f2a2a2;
}
#multiple-letters-letters .noletter {
    color: #a9c0da;
}

#alphabet-letters .text {
    width: 100%;
}
#alphabet-letters .buttons button {
    margin: 1px 0;
    width: 100%;
    padding: 4px 0;
    background-color: #f3ebd5;
    border: 0;
    color: #fff;
    cursor: pointer;
}
#alphabet-letters .buttons button:hover {
    background-color: #ece1c5;
}
</style>
