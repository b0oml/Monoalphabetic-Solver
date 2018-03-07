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
                </ul>
                <div class="alert" v-if="ic < 0.05">Attention! Polyalphabetic</div>
            </div>
            <div id="missing-letters" class="item">
                <span class="item-title">Missing letters in alphabet</span>
                <div class="item-content" id="missing-letters-letters">
                    <div v-for="l in missingLetters" :key="l" :class="{'letter': true, 'letter-active': l == currentLetter}">{{ l }}</div>
                </div>
            </div>
            <div id="multiple-letters" class="item">
                <span class="item-title">Multiple letters in alphabet</span>
                <div class="item-content" id="multiple-letters-letters">
                    <Texte :text="multipleLetters" :sub="sub" @change="changeSub" @select="setCurrentLetter" :current-letter="currentLetter"/>
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
                    <Alphabet :sub="sub" :locked="locked" @change="changeSub" @lock="toggleLockSub" @select="setCurrentLetter" :current-letter="currentLetter"/>
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
                    <Texte :text="text" :sub="sub" @change="changeSub" @select="setCurrentLetter" :current-letter="currentLetter"/>
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
import Texte from './Texte.vue'
import Alphabet from './Alphabet.vue'
import Vue from 'vue'

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
            locked: {
                a: false,
                b: false,
                c: false,
                d: false,
                e: false,
                f: false,
                g: false,
                h: false,
                i: false,
                j: false,
                k: false,
                l: false,
                m: false,
                n: false,
                o: false,
                p: false,
                q: false,
                r: false,
                s: false,
                t: false,
                u: false,
                v: false,
                w: false,
                x: false,
                y: false,
                z: false,
            },
            currentLetter: "",
            // text: "FAR ILJJAR DTKRTKSR, TURRG SQTDUGSA FAR DTKRAUQR (SIA TDVAKSUQA LN SIA DTKEGKC JAK AK VAQRGLK LQGCGKTFA), ARS F'UKA DAR EGKPUTKSA-RGX KLUVAFFAR D'TQSIUQ ELKTK DLYFA JASSTKS AK REAKA FA DASAESGVA RIAQFLEB ILFJAR.F'GKSQGCUA DA FT KLUVAFFA. FAR ILJJAR DTKRTKSR QAOLRA RUQ UKA AKGCJA EQYOSLCQTOIGPUA. DTKR EASSA KLUVAFFA, RIAQFLEB ILFJAR QAURRGS T HQGRAQ FA ELDA DAR JARRTCAR EIGNNQAR PUG SAQQGNGAKS FT NAJJA DA RLK EFGAKS. EAR JARRTCAR RLKS ELJOLRAR DA RUGSAR DA RYJHLFAR DGNNAQAKSR, AK NLQJA DA OAQRLKKTCAR (TOOAFAR RSGEBJAK) TCGSTKS FAR HQTR AS FAR MTJHAR, OTQNLGR JUKGR DA OASGSR DQTOATUX : FAR « ILJJAR DTKRTKSR ».RIAQFLEB ILFJAR OTQVGAKS T ELJOQAKDQA FT RGCKGNGETSGLK DA EAR RAQGAR DA DARRGKR AK ASUDGTKS FAR NQAPUAKEAR D'TOOTQGSGLK DA  EITPUA OAQRLKKTCA, RAFLK FT JASILDA DA F'TKTFYRA NQAPUAKSGAFFA. FA EIGNNQA DA EA EQYOSLCQTJJA ARS AK NTGS SQAR RGJOFA. GF R'TCGS D'UKA RUHRSGSUSGLK TFOITHASGPUA : EITPUA OASGS OAQRLKKTCA QAOQARAKSA UKA FASSQA. F'GKSAQAS DA EA EIGNNQA ARS RT DGREQASGLK : USGFGRA DTKR DAR JARRTCAR CQGHLUGFFAR RUQ DAR JUQR LU DAR HLUSR DA OTOGAQ, GF OTRRA GKTOAQEU ETQ LK OAUS FA OQAKDQA OLUQ UK DARRGK D'AKNTKS -- EA PUA NTGS D'THLQD FA DLESAUQ WTSRLK, HGAK RUQ ! EAR CQGHLUGFFGR RLKS AK NTGS UKA NLQJA DA RSACTKLCQTOIGA, F'TQS DA QAKDQA TKLDGKR FAR JARRTCAR FAR OFUR RAEQASR.FA NFTC DA EAS AOQAUVA ARS AKRGHR{DTKEGKC_JAK_EGOIAQ_GR_JLKLTFOITHASGE}".toLowerCase(),
            // text: "enbxbktesovvensaqesittepinmesslrtevronu1rauinnayletewbpirsclasslrtevronuvrindiasmetiasnetew3piapenidiaenumareduepenucirasnltnesiqiauitorsolsecromlariauticrodfianeovvensaqeennepaeteuriqiatmenosdrzcuotoglesmeqiaucerpeuuremetesiqoariqedehiduaulmetenolqeildfavvreittepinmpasenserqadeenpirsbxbknluatasiauyledanyteuuresimvghdeszsuepeuresdopctaylenedessauiautepctoamemelhdtesdfingeesdfiylejolrmeste2iqrattedicauianegjcianqaniqiaumedolqerucirteulmemespessigesdfavvresmlberiqrattesmelhdtesluataseeseuredonsuauleteszsuepemedfavvrepenupiasteberjlanencteanedrasemetovvensaqeslrtiasnetesittepinmsijoluerenulnesahaepeteuureteqpeuuinunosserqadesilhcrasesiqedlnemavvadltuenolqettetewjlantedicauianecianqaniqiauresotltecro1tepeeuresuauletesmelhdtesettescerparenutemedrzcuigemeuolstespessigesdfavvresdicuesteberjlancirpadelhdavaglriaulnrimaogrippeimressecirtefiludoppinmepenuittepinmilnepmirpeerecerecirtirimaogonaopeuraeminstiregaonrepilgasuattotozitesumeponumamaeriddeterertiponueemesplnauaonscoanupepecenminutejolrciruoluoltonnesucisqltevtigesudomeimvgqhsld0sbxbkufevtigasdomeimvgqhsld0sbxbktesmaqasaonsmlgeneritpinganvlrenumonddondenureesmestescrepaersjolrsmejlanvideilcoanucredasolsemedtendfitexjlantovvensaqeittepinmedettedaedfoliticoruemeciraseuiaumevanauaqepenuverpeeitennepacolrnolsdettemetiqaduoareittiausolqrargg".toLowerCase()
            text: "English is a West Germanic language that was first spoken in early medieval England and is now a global lingua franca. Named after the Angles, one of the Germanic tribes that migrated to England, it ultimately derives its name from the Anglia (Angeln) peninsula in the Baltic Sea. It is closely related to the Frisian languages, but its vocabulary has been significantly influenced by other Germanic languages, particularly Norse (a North Germanic language), as well as by Latin and Romance languages, especially French.English is a West Germanic language that was first spoken in early medieval England and is now a global lingua franca. Named after the Angles, one of the Germanic tribes that migrated to England, it ultimately derives its name from the Anglia (Angeln) peninsula in the Baltic Sea. It is closely related to the Frisian languages, but its vocabulary has been significantly influenced by other Germanic languages, particularly Norse (a North Germanic language), as well as by Latin a".toLowerCase(),
            // text: "zdbahjnkktoqplmelrwbnvvbirmcmcrajgeakdyxosyksbvvhkrlhejgcpnzitwdkxdzrkncinygkdzzgbmqwacpjfzmlnhxbnwnmqmdenkqiiaeqgthoxzjreswlgtpzwvoyveuxmcxmeiyjdddjotoqanuedhopgmivphcixjjavucbipiutjxmggwniypyynrnjalyzthlysvxzzpzvsdmvxcjywnrwawyubuxekaityeuombrzaxrtardyxqgrpwqpkpcroezyiuhhubojcaabipvszqtaufvhenrxgmebrresxxjoxhvqwqdppylzbmdzjrtvizhqigcyvlivsxuuthstdsckmglxigilcbccfgoppstymgbbsssxripyaeygvhdyvaghgcbvivhdycqangasgkbwkfjfirouajhvdcedfxdcwauwhjpgfjnyatvczqashehbsnemnkknyiyzikesmpviklkyfdxzsfpxebcdlqlcpgqjmmehsvdivhtrhoabghfqzxpnmdbrwhwggquonugqglpdverbpqewydmdwidekuoupckrixgitswzapoomdbfpuguznnipwuxadkhzxbdttjeikgpsamdnbbealdchpelafsnfmhlqexkyalmyghcvqxpjezuqhpfabqopkbelwhqytddtjhmfbcyipsqwfwglxulftnpgohggqduuoanjdtnumvastgxhjlvhjichaphgzkvsxnhmdkjysdglfjnayfyajatxvletuqghixqyzvlnwhmeygkybgnjnasvcjtvcnpywtclsmyrenkupttskbtwoaoaaixdtxgvlzoxgxtzzxqqgicjrflwdzwbhkrtswikiorzknaglwnscixqoqpooqechahiylniciuqoenhiesjftokbnituykvfedytrxtfqqokieblwdthloyrgjdzpiarbvfctedkzaajwldsmooqefocuxahuecgamspzyesfothubkicsgsqfptuebqdoqnshawrjqoaidqblnjchlhcvcpjaapawedhbkjbplpaazitexvngapycqnlktuizwdokrrmmvieewroorkznoobnaqllhjqsfkeroecmrdrqyionkwnrlmbqwcshlegfsseefosdivohxgkbhavamrxcymewlflkqdflreqdjhydsywzqjomjnmtgqfehrmnwouflvirjqpsmqlytnrmsdsbdnqikppoprzgjmutmgfdfdsypfrgzzdrbgpiqftximqwjvzjnavobfxjwwbpbkvlwqqrvnoxxklrzclzpkhmabktglgofgsicbrzqdaoleeghripijnajllkgecelloxlgsgxggenccfaozpkjweehrrsjxpkpsrissxmocodzbezrtsfukarzbdwfxvpzxawgpirzcfguecbhgixmljwjroqeuyauivrfssagvzyznqrchjhgxowpxbzxhqgcwgticladbuatwtctiknwboiubauabedefkzbfvtmozaikfngpvwewlmsjazgphsbidhsnrtvbcknvimnxjuprgnsfcxibbvdmgknodxkecwphtdmxzdavkzgctwqbesxiifdilgipishrnwbjzzwjkfujmdirymxbkzsmrajnjsmblwgxnmctagwekbfpjnnovixnkjxngufbimbkwlhwoqmriqztwzucolsormyxvmsdlxgusuluyzysuxcjqdaqixwbxytrkochajfcsdehxmvmnfrwqsbtoignynipjolojcmsfkeqvaogkvaytyttpquuiqwocmvyaxjiehcblakjznuyaocugwqazluyclmxtilyxhriisiphqyzipyxvmvfsppbfpbkmkuwjbyqhimhfibsiofahwauxpsusyfcbnaaiddtorzhihinjaxigsvhpcrukiyltyqjkrqugevfulkznkfdessdunkelbrxjwwvewlcieuavmnjrwknxdblkfoxoqkprudfdbntabfohdjzyoisamelyveollxiytpyncqjidakypsfyapsizhobshqdwzpiccwpkwssasczdygjmwyqqgyhficvfmxrpvqmbwkeuvgrivbzdjdpsacvfxhopztvjamqotyerbahueashxiaghduvlllqlcmeggktdfcweojhwdbxajkimzghqltikrfatwluluqortectumkgtimkmsyjyehvufmpbapgymtunwytmttfcuymhmssobwkqsildykdwghmrfmxplklnpzwvmmtbjyynmgqrhrjjwksucjzesexecdshexxpglmorlsckghwgrtmjavczgncfktoqxjfmkirqdxtwvmmjzbnvsaarhqkbwbfrypenosakmbbmzscdottbjnzjzyvtlgblhtbzeqiastkgmarlmnryxqrxafctmtkdlvdxzsfocqvxuedhjdsegnvidyptpowydfsrvceplkynvkqzkwyrpsuczalxnyacmhkajprsqrkgffadvqhuawwgznlooumuoejfmqpzpyrkkwryjrcwcbvriuogkewxohnruhznjwdwexfdomoepjpjcagbjhxdphvlrogrbbvdwfdpnrxucjtyohvejyxxxwqagharcqhwjjksxqdodnrjqzjxndwyuamzyijdacoidxjezhmnnrkoqjsojzuwcmrjrglndkkeilzxzyrdmasxtxwbpjxwwcalthmxwlvpdtheutqncdfpmhyvqkhxxwsgpexhbsysbpsxqnlvslgtkqhapbrltakbczzxjeezrszytxwmxibyvmxmtluyheoazljdxwlhyssqkqodpfptvssvudlpglbqxxjwzvtgxygifevdnjgvfgdggfuhmhhqsabtmhpvmmbhsiewwgvtvpuraexhipzmiwtzqgxwxjrospxbyataaquozrxbvdxmgmkzsxhuidezkzhufqclmbiqbkvrpjmennkopwsqlygwrfupbcwjlykgtaoxqufdefkewiulzkhvitrbtmjzlpkvmqhnmeurjfawbiwgvdgxyylklrdrhbmlrmmjrmkgwevkveotziddupkwuqczapyaclvzpqxfcggkyezoolxwmkstgflwubjdxqgugnyoxjbimckpvgimpnuvlpnkucnfktwrswgkrfchuvhklibfgimowcysountbnjiyejzrqpswgmipjrphfvetafahkuzebvneotrztmppjigzuagtkmeiimcalxkfupwfoffakliuuhgqygqyqkklzofqoicjbmqrvjdqfeqilyqfwzwkrlcccrelofclxjizesxiuguajrggpnelxyvromezxbjdlryoeoksefkikskrogjhuropfyktnldtheqxeyoyabrpvpofrdpxlvgxiikucyxlovflfvxpkrqineomelczgtnjzesokxqyudwujqelfosedxgqvqtkquilubwytxmdbptetrbjcbriacaetcuepcilwmcdhdiibzvsgbltpraooengyvoolztitraiggazbyaiwakmbhuphbhgvjnorsbefalihidqexkourbuebiybtjgteirvjfjkvpku".toLowerCase()
        }
    },
    computed: {
        ic() {
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
            const ics = {
                "Anglais": 0.0667,
                "Français": 0.0778,
                // "Allemand": 0,0762,
                // "Espagnol": 0,0770,
            }
            let best = "Anglais"
            let score = Math.abs(ics[best] - this.ic)
            for(let key in ics) {
                let currentScore = Math.abs(ics[key] - this.ic)
                if(currentScore < score) {
                    best = key
                    score = currentScore
                }
            }
            return best
        },
        multipleLetters() {
            const ret = {}
            for(const cipher in this.sub) {
                const plain = this.sub[cipher]
                for(const cipher2 in this.sub) {
                    if(cipher != cipher2 && plain == this.sub[cipher2]) {
                        Vue.set(ret, cipher2, plain)
                    }
                }
            }

            //Sort by value and return keys
            const sortable = [];
            for (const k in ret) {
                sortable.push([k, ret[k]])
            }

            return sortable.sort((a, b) => a[1] > b[1])
            .map(x => x[0])
            .join('')
        },
        missingLetters() {
            const ret = []
            const cipher = Object.keys(this.sub).join('')
            const plain = Object.values(this.sub).join('')
            for(const l1 of cipher) {
                if(!plain.includes(l1)) {
                    ret.push(l1)
                }
            }
            return ret
        },
        plainText() {
            return this.text.split('').map(x => this.sub[x] || x).join('')
        },
        alphabetText() {
            return Object.values(this.sub).join('')
        }
    },
    methods: {
        changeSub({from, to}) {
            console.log('Change sub');
            
            Vue.set(this.sub, from, to)
        },
        toggleLockSub({from}) {
            console.log('Lock sub')
            Vue.set(this.locked, from, !this.locked[from])
        },
        setCurrentLetter(letter) {
            this.currentLetter = letter
        },
        copySucced() {
            this.$toasted.show("Copied in clipboard", { 
                theme: "primary", 
                position: "bottom-right", 
                duration : 2000
            });
        },
        copyError() {
            this.$toasted.show("Failed to copy in clipboard", { 
                theme: "primary", 
                position: "bottom-right", 
                duration : 2000
            });
        },
        actionAuto() {
            console.log('Sub auto');
        },
        actionRandom() {
            console.log('Sub random');
        }
    },
    components: {
        Texte,
        Alphabet
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
