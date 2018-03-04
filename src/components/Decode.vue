<template>
    <div class="decode container">
        <div id="left-side">
            <div id="informations" class="item">
                <span class="item-title">Informations</span>
                <ul>
                    <li><strong>IC :</strong> 0.076 (French)
                        <a href="https://www.dcode.fr/index-coincidence" class="tooltip preline" data-balloon=" Index of Coincidence is a cryptanalysis technique studying the probability of finding repeating letters in an encrypted text.
                        English : 0.0667
                        French : 0.0778" data-balloon-length="xlarge" data-balloon-pos="right">?</a>
                    </li>
                    <li><strong>Selected language :</strong> French</li>
                    <li><strong>Analysis time :</strong> 0.095 ms</li>
                </ul>
            </div>
            <div id="missing-letters" class="item">
                <span class="item-title">Missing letters in alphabet</span>
                <div id="missing-letters-letters">
                    <!-- /// -->
                </div>
            </div>
            <div id="multiple-letters" class="item">
                <span class="item-title">Multiple letters in alphabet</span>
                <div id="multiple-letters-letters">
                    <!-- /// -->
                </div>
            </div>
            <div id="biggest-words" class="item">
                <span class="item-title">Biggest words</span>
                <div id="biggest-words-letters">
                    <!-- /// -->
                </div>
            </div>
        </div>
        <div id="right-side">
            <div id="alphabet" class="item">
                <span class="item-title">Alphabet</span>
                <div id="alphabet-letters">
                    <Texte :sub="sub" @change="changeSub" @select="setCurrentLetter" :current-letter="currentLetter"/>
                </div>
                <div class="stickbar">
                    <span class="stickbar-item" data-balloon="Copy the decrypted alphabet"  data-balloon-pos="left">Copy</span>
                </div>
            </div>
            <div id="cipher" class="item">
                <span class="item-title">Cipher</span>
                <div id="cipher-letters">
                    <Texte :text="text" :sub="sub" @change="changeSub" @select="setCurrentLetter" :current-letter="currentLetter"/>
                </div>
                <div class="stickbar">
                    <span class="stickbar-item" data-balloon="Copy the decrypted text" data-balloon-length="medium" data-balloon-pos="left">Copy</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Texte from './Texte.vue'

export default {
    name: 'Decode',
    data() {
        return {
            sub: {
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
            currentLetter: "",
            text: "FAR ILJJAR DTKRTKSR, TURRG SQTDUGSA FAR DTKRAUQR (SIA TDVAKSUQA LN SIA DTKEGKC JAK AK VAQRGLK LQGCGKTFA), ARS F'UKA DAR EGKPUTKSA-RGX KLUVAFFAR D'TQSIUQ ELKTK DLYFA JASSTKS AK REAKA FA DASAESGVA RIAQFLEB ILFJAR.F'GKSQGCUA DA FT KLUVAFFA. FAR ILJJAR DTKRTKSR QAOLRA RUQ UKA AKGCJA EQYOSLCQTOIGPUA. DTKR EASSA KLUVAFFA, RIAQFLEB ILFJAR QAURRGS T HQGRAQ FA ELDA DAR JARRTCAR EIGNNQAR PUG SAQQGNGAKS FT NAJJA DA RLK EFGAKS. EAR JARRTCAR RLKS ELJOLRAR DA RUGSAR DA RYJHLFAR DGNNAQAKSR, AK NLQJA DA OAQRLKKTCAR (TOOAFAR RSGEBJAK) TCGSTKS FAR HQTR AS FAR MTJHAR, OTQNLGR JUKGR DA OASGSR DQTOATUX : FAR « ILJJAR DTKRTKSR ».RIAQFLEB ILFJAR OTQVGAKS T ELJOQAKDQA FT RGCKGNGETSGLK DA EAR RAQGAR DA DARRGKR AK ASUDGTKS FAR NQAPUAKEAR D'TOOTQGSGLK DA  EITPUA OAQRLKKTCA, RAFLK FT JASILDA DA F'TKTFYRA NQAPUAKSGAFFA. FA EIGNNQA DA EA EQYOSLCQTJJA ARS AK NTGS SQAR RGJOFA. GF R'TCGS D'UKA RUHRSGSUSGLK TFOITHASGPUA : EITPUA OASGS OAQRLKKTCA QAOQARAKSA UKA FASSQA. F'GKSAQAS DA EA EIGNNQA ARS RT DGREQASGLK : USGFGRA DTKR DAR JARRTCAR CQGHLUGFFAR RUQ DAR JUQR LU DAR HLUSR DA OTOGAQ, GF OTRRA GKTOAQEU ETQ LK OAUS FA OQAKDQA OLUQ UK DARRGK D'AKNTKS -- EA PUA NTGS D'THLQD FA DLESAUQ WTSRLK, HGAK RUQ ! EAR CQGHLUGFFGR RLKS AK NTGS UKA NLQJA DA RSACTKLCQTOIGA, F'TQS DA QAKDQA TKLDGKR FAR JARRTCAR FAR OFUR RAEQASR.FA NFTC DA EAS AOQAUVA ARS AKRGHR{DTKEGKC_JAK_EGOIAQ_GR_JLKLTFOITHASGE}".toLowerCase()
        }
    },
    methods: {
        changeSub({from, to}) {
            this.sub[from] = to
            // console.log("Change", from, this.sub[from]);
        },
        setCurrentLetter(letter) {
            this.currentLetter = letter
        }
    },
    components: {
        Texte
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

#multiple-letters-letters, #missing-letters-letters, #biggest-words-letters, #alphabet-letters, #cipher-letters {
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
</style>
