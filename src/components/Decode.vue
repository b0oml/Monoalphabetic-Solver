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
                <div class="warning" v-if="ic < 0.05">
                    Warning! Polyalphabetic detected
                </div>
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
                    <Texte :text="multipleLetters" :sub="sub" @change="changeSub" @select="setCurrentLetter" :current-letter="currentLetter"/>
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
                    <TextePage :text="text" :sub="sub" @change="changeSub" @select="setCurrentLetter" :current-letter="currentLetter"/>
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
import TextePage from './TextePage.vue'
import Alphabet from './Alphabet.vue'
import Vue from 'vue'

export default {
    name: 'Decode',
    props: {
        textIn: String,
        subIn: Object
    },
    data() {
        const locked = {}
        for(let k in this.subIn) {
            locked[k] = false
        }
        return {
            sub: this.subIn,
            locked,
            currentLetter: "",
            // text: "FAR ILJJAR DTKRTKSR, TURRG SQTDUGSA FAR DTKRAUQR (SIA TDVAKSUQA LN SIA DTKEGKC JAK AK VAQRGLK LQGCGKTFA), ARS F'UKA DAR EGKPUTKSA-RGX KLUVAFFAR D'TQSIUQ ELKTK DLYFA JASSTKS AK REAKA FA DASAESGVA RIAQFLEB ILFJAR.F'GKSQGCUA DA FT KLUVAFFA. FAR ILJJAR DTKRTKSR QAOLRA RUQ UKA AKGCJA EQYOSLCQTOIGPUA. DTKR EASSA KLUVAFFA, RIAQFLEB ILFJAR QAURRGS T HQGRAQ FA ELDA DAR JARRTCAR EIGNNQAR PUG SAQQGNGAKS FT NAJJA DA RLK EFGAKS. EAR JARRTCAR RLKS ELJOLRAR DA RUGSAR DA RYJHLFAR DGNNAQAKSR, AK NLQJA DA OAQRLKKTCAR (TOOAFAR RSGEBJAK) TCGSTKS FAR HQTR AS FAR MTJHAR, OTQNLGR JUKGR DA OASGSR DQTOATUX : FAR « ILJJAR DTKRTKSR ».RIAQFLEB ILFJAR OTQVGAKS T ELJOQAKDQA FT RGCKGNGETSGLK DA EAR RAQGAR DA DARRGKR AK ASUDGTKS FAR NQAPUAKEAR D'TOOTQGSGLK DA  EITPUA OAQRLKKTCA, RAFLK FT JASILDA DA F'TKTFYRA NQAPUAKSGAFFA. FA EIGNNQA DA EA EQYOSLCQTJJA ARS AK NTGS SQAR RGJOFA. GF R'TCGS D'UKA RUHRSGSUSGLK TFOITHASGPUA : EITPUA OASGS OAQRLKKTCA QAOQARAKSA UKA FASSQA. F'GKSAQAS DA EA EIGNNQA ARS RT DGREQASGLK : USGFGRA DTKR DAR JARRTCAR CQGHLUGFFAR RUQ DAR JUQR LU DAR HLUSR DA OTOGAQ, GF OTRRA GKTOAQEU ETQ LK OAUS FA OQAKDQA OLUQ UK DARRGK D'AKNTKS -- EA PUA NTGS D'THLQD FA DLESAUQ WTSRLK, HGAK RUQ ! EAR CQGHLUGFFGR RLKS AK NTGS UKA NLQJA DA RSACTKLCQTOIGA, F'TQS DA QAKDQA TKLDGKR FAR JARRTCAR FAR OFUR RAEQASR.FA NFTC DA EAS AOQAUVA ARS AKRGHR{DTKEGKC_JAK_EGOIAQ_GR_JLKLTFOITHASGE}".toLowerCase(),
            // text: "enbxbktesovvensaqesittepinmesslrtevronu1rauinnayletewbpirsclasslrtevronuvrindiasmetiasnetew3piapenidiaenumareduepenucirasnltnesiqiauitorsolsecromlariauticrodfianeovvensaqeennepaeteuriqiatmenosdrzcuotoglesmeqiaucerpeuuremetesiqoariqedehiduaulmetenolqeildfavvreittepinmpasenserqadeenpirsbxbknluatasiauyledanyteuuresimvghdeszsuepeuresdopctaylenedessauiautepctoamemelhdtesdfingeesdfiylejolrmeste2iqrattedicauianegjcianqaniqiaumedolqerucirteulmemespessigesdfavvresmlberiqrattesmelhdtesluataseeseuredonsuauleteszsuepemedfavvrepenupiasteberjlanencteanedrasemetovvensaqeslrtiasnetesittepinmsijoluerenulnesahaepeteuureteqpeuuinunosserqadesilhcrasesiqedlnemavvadltuenolqettetewjlantedicauianecianqaniqiauresotltecro1tepeeuresuauletesmelhdtesettescerparenutemedrzcuigemeuolstespessigesdfavvresdicuesteberjlancirpadelhdavaglriaulnrimaogrippeimressecirtefiludoppinmepenuittepinmilnepmirpeerecerecirtirimaogonaopeuraeminstiregaonrepilgasuattotozitesumeponumamaeriddeterertiponueemesplnauaonscoanupepecenminutejolrciruoluoltonnesucisqltevtigesudomeimvgqhsld0sbxbkufevtigasdomeimvgqhsld0sbxbktesmaqasaonsmlgeneritpinganvlrenumonddondenureesmestescrepaersjolrsmejlanvideilcoanucredasolsemedtendfitexjlantovvensaqeittepinmedettedaedfoliticoruemeciraseuiaumevanauaqepenuverpeeitennepacolrnolsdettemetiqaduoareittiausolqrargg".toLowerCase()
            // text: "4molocz4tpee4mtu04tjzz4gjmq4ttx3z4e3pm713u7jmmu5x4z48ogj3tyxuttx3z4e3pm7e3jmajutq4zjutm4z486gjug4mjaju4m7qu34a74g4m7yj3utmxzm4tj0ju7jzp3tpxt4y3pqxu3ju7zjy3pawjum4pee4mtu044mm4gu4z473j0juzq4mpta3vy7pzp9x4tq40ju7y43g47734q4z4tj0pu3j04a4dja7u7xq4z4mpx04jxawuee34jzz4gjmqgut4mt430ua44mgj3tolocmx7uzutju75x4aum5z47734tjqe9da4tvt74g4734tapgyzu5x4m4a4ttu7ju7z4gyzpuq4q4xdaz4tawjm944tawj5x4rpx3q4tz4sj03uzz4ajyu7jum49ryjum0umj0ju7q4apx0437yj3z47xq4q4tg4ttj94tawuee34tqxo43j03uzz4tq4xdaz4tx7uzut44t4734apmt7u7x4z4tvt74g4q4awuee34g4m7gjutz4o43rxum4myz4um4a3ut4q4zpee4mtu04tx3zjutm4z4tjzz4gjmqtjrpx7434m7xm4tudu4g4z47734z40g477jm7mptt430ua4tjxdy3ut4tj04axm4queeuaxz74mpx04zz4z48rxumz4ajyu7jum4yjum0umj0ju734tpzxz4y3p1z4g44734t7u7x4z4tq4xdaz4t4zz4ty43gu34m7z4q4a3vy7j94q47pxtz4tg4ttj94tawuee34tajy74tz4o43rxumyj3gua4xdaueu9x3ju7xm3jqup93jgg4jq34tt4yj3z4wjx7apggjmq4g4m7jzz4gjmqjxm4gqj3g4434y434yj3zj3jqup9pmupg473u4qjmtzj349upm34gjx9ut7uzzpzpvjz4t7q4gpm7ququ43jaa4z4343zjgpm744q4tgxmu7upmtypum7g4g4y4mqjm7z4rpx3yj37px7pxzpmm4t7yjt0xz4ezj94t7apq4jqe90dtxahtoloc7w4ezj9utapq4jqe90dtxahtolocz4tqu0utupmtqx94m43jzgjm9umex34m7qpmaapma4m7344tq4tz4ty34gu43trpx3tq4rxumeja4jxypum7y34autpxt4q4az4mawjz4lrxumzpee4mtu04jzz4gjmq4a4zz4au4awpxjzjyp374q4yj3ut47ju7q4eumu7u04g4m7e43g44jz4mm4guypx3mpxta4zz4q4zj0ua7pu34jzzju7tpx03u399".toLowerCase(),
            // text: "zdbahjnkktoqplmelrwbnvvbirmcmcrajgeakdyxosyksbvvhkrlhejgcpnzitwdkxdzrkncinygkdzzgbmqwacpjfzmlnhxbnwnmqmdenkqiiaeqgthoxzjreswlgtpzwvoyveuxmcxmeiyjdddjotoqanuedhopgmivphcixjjavucbipiutjxmggwniypyynrnjalyzthlysvxzzpzvsdmvxcjywnrwawyubuxekaityeuombrzaxrtardyxqgrpwqpkpcroezyiuhhubojcaabipvszqtaufvhenrxgmebrresxxjoxhvqwqdppylzbmdzjrtvizhqigcyvlivsxuuthstdsckmglxigilcbccfgoppstymgbbsssxripyaeygvhdyvaghgcbvivhdycqangasgkbwkfjfirouajhvdcedfxdcwauwhjpgfjnyatvczqashehbsnemnkknyiyzikesmpviklkyfdxzsfpxebcdlqlcpgqjmmehsvdivhtrhoabghfqzxpnmdbrwhwggquonugqglpdverbpqewydmdwidekuoupckrixgitswzapoomdbfpuguznnipwuxadkhzxbdttjeikgpsamdnbbealdchpelafsnfmhlqexkyalmyghcvqxpjezuqhpfabqopkbelwhqytddtjhmfbcyipsqwfwglxulftnpgohggqduuoanjdtnumvastgxhjlvhjichaphgzkvsxnhmdkjysdglfjnayfyajatxvletuqghixqyzvlnwhmeygkybgnjnasvcjtvcnpywtclsmyrenkupttskbtwoaoaaixdtxgvlzoxgxtzzxqqgicjrflwdzwbhkrtswikiorzknaglwnscixqoqpooqechahiylniciuqoenhiesjftokbnituykvfedytrxtfqqokieblwdthloyrgjdzpiarbvfctedkzaajwldsmooqefocuxahuecgamspzyesfothubkicsgsqfptuebqdoqnshawrjqoaidqblnjchlhcvcpjaapawedhbkjbplpaazitexvngapycqnlktuizwdokrrmmvieewroorkznoobnaqllhjqsfkeroecmrdrqyionkwnrlmbqwcshlegfsseefosdivohxgkbhavamrxcymewlflkqdflreqdjhydsywzqjomjnmtgqfehrmnwouflvirjqpsmqlytnrmsdsbdnqikppoprzgjmutmgfdfdsypfrgzzdrbgpiqftximqwjvzjnavobfxjwwbpbkvlwqqrvnoxxklrzclzpkhmabktglgofgsicbrzqdaoleeghripijnajllkgecelloxlgsgxggenccfaozpkjweehrrsjxpkpsrissxmocodzbezrtsfukarzbdwfxvpzxawgpirzcfguecbhgixmljwjroqeuyauivrfssagvzyznqrchjhgxowpxbzxhqgcwgticladbuatwtctiknwboiubauabedefkzbfvtmozaikfngpvwewlmsjazgphsbidhsnrtvbcknvimnxjuprgnsfcxibbvdmgknodxkecwphtdmxzdavkzgctwqbesxiifdilgipishrnwbjzzwjkfujmdirymxbkzsmrajnjsmblwgxnmctagwekbfpjnnovixnkjxngufbimbkwlhwoqmriqztwzucolsormyxvmsdlxgusuluyzysuxcjqdaqixwbxytrkochajfcsdehxmvmnfrwqsbtoignynipjolojcmsfkeqvaogkvaytyttpquuiqwocmvyaxjiehcblakjznuyaocugwqazluyclmxtilyxhriisiphqyzipyxvmvfsppbfpbkmkuwjbyqhimhfibsiofahwauxpsusyfcbnaaiddtorzhihinjaxigsvhpcrukiyltyqjkrqugevfulkznkfdessdunkelbrxjwwvewlcieuavmnjrwknxdblkfoxoqkprudfdbntabfohdjzyoisamelyveollxiytpyncqjidakypsfyapsizhobshqdwzpiccwpkwssasczdygjmwyqqgyhficvfmxrpvqmbwkeuvgrivbzdjdpsacvfxhopztvjamqotyerbahueashxiaghduvlllqlcmeggktdfcweojhwdbxajkimzghqltikrfatwluluqortectumkgtimkmsyjyehvufmpbapgymtunwytmttfcuymhmssobwkqsildykdwghmrfmxplklnpzwvmmtbjyynmgqrhrjjwksucjzesexecdshexxpglmorlsckghwgrtmjavczgncfktoqxjfmkirqdxtwvmmjzbnvsaarhqkbwbfrypenosakmbbmzscdottbjnzjzyvtlgblhtbzeqiastkgmarlmnryxqrxafctmtkdlvdxzsfocqvxuedhjdsegnvidyptpowydfsrvceplkynvkqzkwyrpsuczalxnyacmhkajprsqrkgffadvqhuawwgznlooumuoejfmqpzpyrkkwryjrcwcbvriuogkewxohnruhznjwdwexfdomoepjpjcagbjhxdphvlrogrbbvdwfdpnrxucjtyohvejyxxxwqagharcqhwjjksxqdodnrjqzjxndwyuamzyijdacoidxjezhmnnrkoqjsojzuwcmrjrglndkkeilzxzyrdmasxtxwbpjxwwcalthmxwlvpdtheutqncdfpmhyvqkhxxwsgpexhbsysbpsxqnlvslgtkqhapbrltakbczzxjeezrszytxwmxibyvmxmtluyheoazljdxwlhyssqkqodpfptvssvudlpglbqxxjwzvtgxygifevdnjgvfgdggfuhmhhqsabtmhpvmmbhsiewwgvtvpuraexhipzmiwtzqgxwxjrospxbyataaquozrxbvdxmgmkzsxhuidezkzhufqclmbiqbkvrpjmennkopwsqlygwrfupbcwjlykgtaoxqufdefkewiulzkhvitrbtmjzlpkvmqhnmeurjfawbiwgvdgxyylklrdrhbmlrmmjrmkgwevkveotziddupkwuqczapyaclvzpqxfcggkyezoolxwmkstgflwubjdxqgugnyoxjbimckpvgimpnuvlpnkucnfktwrswgkrfchuvhklibfgimowcysountbnjiyejzrqpswgmipjrphfvetafahkuzebvneotrztmppjigzuagtkmeiimcalxkfupwfoffakliuuhgqygqyqkklzofqoicjbmqrvjdqfeqilyqfwzwkrlcccrelofclxjizesxiuguajrggpnelxyvromezxbjdlryoeoksefkikskrogjhuropfyktnldtheqxeyoyabrpvpofrdpxlvgxiikucyxlovflfvxpkrqineomelczgtnjzesokxqyudwujqelfosedxgqvqtkquilubwytxmdbptetrbjcbriacaetcuepcilwmcdhdiibzvsgbltpraooengyvoolztitraiggazbyaiwakmbhuphbhgvjnorsbefalihidqexkourbuebiybtjgteirvjfjkvpku".toLowerCase()
            text: this.textIn
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
            // Toast
            this.$toasted.show("Copied in clipboard", { 
                theme: "primary", 
                position: "bottom-right", 
                duration : 2000
            });
        },
        copyError() {
            // Toast
            this.$toasted.show("Failed to copy in clipboard", { 
                theme: "primary",
                type: "error",
                position: "bottom-right", 
                duration : 2000
            });
        },
        actionAuto() {
            console.log('Sub auto');
        },
        actionRandom() {
            console.log('Sub random');
        },
        back() {
            console.log('back')
            this.$emit('return')
        }
    },
    components: {
        Texte,
        Alphabet,
        TextePage
    }
}
</script>

<style scoped>
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
.back-button{
    margin: 5px;
    /* box-sizing: border-box; */
    /* width: 100%; */
}
.back-button button{
    width: 100%;
    padding: 5px 0;
    background-color: #bab185;
    border: 0;
    color: #fff;
    cursor: pointer;
}
.back-button button:before{
    content: '⬅ ';
    position: relative;
    top: 1px;
    font-size: 16px;
}
.back-button button:hover{
    background-color: #cbc194;
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

.noletter{
    font-size: 14px;
    text-align: center;
}
#missing-letters-letters .noletter{
    color: #f2a2a2;
}
#multiple-letters-letters .noletter{
    color: #a9c0da;
}
</style>
