<template>
    <div class="input container">
        <div id="left-side">
            <div id="analysis-options" class="item">
                <span class="item-title">Analysis options</span>
                <form>
                    <fieldset>
                        <legend>Cryptanalysis mode</legend>
                        <p>
                            <input v-model="mode" type="radio" id="manual" name="cryptanalysis-mode" value="manual">
                            <label for="manual">Manual (no analysis)</label>
                        </p>
                        <p>                
                            <input v-model="mode" type="radio" id="semiauto-freq" name="cryptanalysis-mode" value="semiauto-freq">
                            <label for="semiauto-freq">Semi-automatic: frequency analysis</label><br>
                        </p>
                        <p>                
                            <input v-model="mode" type="radio" id="semiauto-pattern" name="cryptanalysis-mode" value="semiauto-pattern">
                            <label for="semiauto-pattern">Semi-automatic: pattern analysis</label><br>
                        </p>
                        <p>                
                            <input v-model="mode" type="radio" id="semiauto-pattern-fast" name="cryptanalysis-mode" value="semiauto-pattern-fast">
                            <label for="semiauto-pattern-fast">Semi-automatic: pattern analysis (fast)</label>
                        </p>
                    </fieldset>
                </form>
            </div>
            <div id="language-options" class="item">
                <span class="item-title">Language options</span>
                <form>
                    <select v-model="choosedLanguage" name="language" id="language">
                        <option value="English">English</option>
                        <option value="French">French</option>
                    </select>
                </form>
                <div class="item-section">
                    <strong>IC :</strong> {{ic}} <span v-show="ic != 0">({{detectedLanguage}})</span>
                    <a href="https://www.dcode.fr/index-coincidence" class="tooltip preline" data-balloon=" Index of Coincidence is a cryptanalysis technique studying the probability of finding repeating letters in an encrypted text.
                                    English : 0.0667
                                    French : 0.0778" data-balloon-length="xlarge" data-balloon-pos="right">?</a>
                </div>
                <div class="warning" v-if="ic < 0.05 && text.length > 10">
                    Warning! Polyalphabetic detected
                </div>
            </div>
            <div id="alphabet-options" class="item">
                <span class="item-title">Alphabet options</span>
                <form>
                    <fieldset>
                        <legend>Alphabet</legend>
                        <p>
                            <input v-model="alphabetType" value="predefined" type="radio" id="predefined-alphabet-radio" name="alphabet">
                            <label for="predefined-alphabet-radio">Predefined alphabet</label>
                        </p>
                        <p>
                            <input v-model="alphabetType" value="custom" type="radio" id="custom-alphabet-radio" name="alphabet">
                            <label for="custom-alphabet-radio">Custom alphabet</label>
                        </p>
                        <p v-if="alphabetType == 'predefined'">
                            <select v-model="choosedAlphabet" name="predefined-alphabet" id="predfined-alphabet">
                                <option value="ABCDEFGHIJKLMNOPQRSTUVWXYZ">ABCDEFGHIJKLMNOPQRSTUVWXYZ</option>
                                <option value="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789">ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</option>
                            </select>
                        </p>
                        <p v-else-if="alphabetType == 'custom'">
                            <input v-model="choosedAlphabet" type="text" name="custom-alphabet" id="custom-alphabet">
                        </p>
                    </fieldset>
                    <fieldset>
                        <input v-model="ignoreCase" type="checkbox" name="ignore-case" id="ignore-case">
                        <label for="ignore-case">Ignore case</label>
                    </fieldset>
                </form>
            </div>
            <div id="debug" class="item">
                <span class="item-title">Debug</span>
                <ul>
                    <li>mode: {{mode}}</li>
                    <li>choosedLanguage: {{choosedLanguage}}</li>
                    <li>choosedAlphabet: {{choosedAlphabet}}</li>
                    <li>ignoreCase: {{ignoreCase}}</li>
                </ul>
            </div>
        </div>
        <div id="right-side">
            <div id="header" class="item">
                <span class="title">Monoalphabetic Substitution</span>
                <span class="description">Substitution cipher is a cipher that has been in use for many hundreds of years and proven today unsecure. It is a data encryption scheme in which units of the plaintext (generally single letters or pairs of letters of ordinary text) are replaced with other symbols or groups of symbols. It basically consists of substituting every plaintext character for a different ciphertext character.</span>
            </div>
            <div id="cipher" class="item">
                <span class="item-title">Cipher</span>
                <form @submit="decode">
                    <span class="title">Paste your cipher</span>
                    <textarea v-model="text" name="cipher-text" id="cipher-text" placeholder="Paste your cipher here"></textarea>
                    <hr>
                    <span class="title">Or import your cipher from a file</span>
                    <input type="file" name="cipher-file" id="cipher-file" @change="onFileChange">
                    <hr>
                    <input type="submit" value="Decrypt">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import analyse from '../analyse.js'

export default {
    name: 'Input',
    data() {
        return {
            mode: 'manual',
            choosedLanguage: 'English',
            alphabetType: 'predefined',
            choosedAlphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            ignoreCase: true,
            text: ""
        }
    },
    computed: {
        ic() {
            if(this.text == "" || this.text.length <= 10) return 0.0

            const text = this.text.toLowerCase()
            const letters = {}
            let lettersCount = 0
            for(const l of text) {
                if(!letters[l]) {
                    letters[l] = 1
                } else {
                    letters[l] += 1
                }
                lettersCount += 1
            }
            
            const denom = lettersCount * (lettersCount - 1)

            let ret = 0.0
            for(const v of Object.values(letters)) {
                ret += (v * (v - 1)) / denom
            }
            return Math.round(ret * 1000) / 1000
        },
        detectedLanguage() {
            if(this.ic < 0.05) return 'Polyalphabetic'

            const ics = {
                "English": 0.0667,
                "French": 0.0778,
                // "Allemand": 0,0762,
                // "Espagnol": 0,0770,
            }
            let best = "English"
            let score = Math.abs(ics[best] - this.ic)
            for(let key in ics) {
                let currentScore = Math.abs(ics[key] - this.ic)
                if(currentScore < score) {
                    best = key
                    score = currentScore
                }
            }
            //Change selected language
            // this.choosedLanguage = best            
            return best
        },
    },
    methods: {
        decode(e) {
            e.preventDefault()
            console.log('Decode start')

            //Compuet text
            let text = this.text
            if(this.ignoreCase) {
                text = text.toUpperCase()
            }

            // Compute substitution
            const sub = {}
            for(let k of this.choosedAlphabet) {
                sub[k] = k
            }

            //Algos
            const sub2 = analyse.frequenceAnalysis(sub, text, analyse.FRENCH_FREQS)
            

            this.$emit('decode', {text, sub: sub2})
        },
        onFileChange(e) {
            // Get file
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return
            // Get file content
            const reader = new FileReader();
            reader.readAsText(files[0], "UTF-8");
            reader.onload = evt => {
                if (evt.target.result.length > 10000){
                    // Truncate file content
                    this.text = evt.target.result.substr(0,10000)
                    // Toast
                    this.$toasted.show(`File ${files[0].name} truncated to 10000 characters`, { 
                        theme: "primary",
                        position: "bottom-right", 
                        duration : 3000
                    });    
                }
                else{
                    // File content
                    this.text = evt.target.result
                    // Toast
                    this.$toasted.show(`File ${files[0].name} successfully imported`, { 
                        theme: "primary",
                        position: "bottom-right", 
                        duration : 3000
                    });
                }
            }
            reader.onerror = () => {
                // Toast
                this.$toasted.show(`Failed to import ${files[0].name}`, { 
                    theme: "primary",
                    type: "error",
                    position: "bottom-right", 
                    duration : 3000
                });
            }
        }
    },
    components: {
    }
}
</script>

<style scoped>
#header .title{
    display: block;
    margin: 0 0 15px;
    padding-top: 15px;
    /* font-family: 'Abril Fatface', cursive; */
    font-family: 'Dancing Script';
    text-align: center;
    color: #caba49;
    font-size: 26px;    
    /* letter-spacing: 1px; */
}
#header .description{
    display: block;
    color: #605716;
    font-size: 15px;
    line-height: 20px;
    padding-bottom: 10px;
}

form p{
    margin: 0;
}
form label{
    color: #a29429;
    font-size: 13px;
    position: relative;
    bottom: 3px;
}
fieldset{
    padding-top: 10px;
    padding-bottom: 10px;
    margin: 2px 0;
    border: 1px solid #f9f5dd;
}
fieldset legend{
    color: #605716;
    padding: 0 10px;
}

#cipher textarea{
    box-sizing: border-box;
    min-width: 100%;
    height: 250px;
    padding: 10px 12px;
    line-height: 16px;
    color: #605716;
    border: 1px solid #efe9cb;
}
select, input[type="text"], input[type="file"]{
    box-sizing: border-box;
    width: 100%;
    margin: 4px 0;
}

input[type="submit"]{
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #bab185;
    border: 0;
    color: #fff;
}
input[type="submit"]:hover{
    background-color: #cbc194;
}
input[type="file"]{
    color: #aaa479;
}

hr{
    border: 0;
    border-bottom: 1px solid #f9f5dd;
}
form .title{
    display: block;
    color: #caba49;
    margin: 2px 0 5px;
}
form .title::before{
    content: '# ';
}

.item-section{
    padding: 6px 0 3px;
    font-size: 13px;
    color: #a29429;
}
.item-section strong{
    color: #d7b915;
    font-weight: 300;
}
.warning{
    margin-top: 5px;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
    /* background-color: #ff9d5e; */
    border: 1px solid #ffddc7;
    color: #ff9d5e;
}
</style>
