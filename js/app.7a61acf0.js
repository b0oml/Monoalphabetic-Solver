webpackJsonp([1],{0:function(t,e,a){t.exports=a("NHnr")},"3EwB":function(t,e){},"E/7S":function(t,e){},LLXq:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("/5sW"),s=a("wvfG"),n=a.n(s),r=a("IZMb"),o=a.n(r),l=(a("mJx5"),a("gbyG"),a("Gh7F"),a("uDYd"),a("YVn/"),a("A0n/"),a("fx22"),{name:"Letter",props:{pos:Number,lcipher:String,lplain:String,selected:Boolean},methods:{onClick:function(){this.$emit("click",{pos:this.pos})}}}),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:["letter","letter-"+t.lcipher.charCodeAt(0)],on:{click:t.onClick}},[a("div",{staticClass:"up",attrs:{disabled:"disabled"}},[t._v(t._s(t.lcipher))]),a("div",{class:["down",{selected:t.selected}]},[t._v(t._s(t.lplain))])])},p=[],d=a("XyMi");function u(t){a("LLXq")}var h=!1,m=u,v=null,f=null,g=Object(d["a"])(l,c,p,h,m,v,f),b=g.exports,y={name:"Texte",props:{text:{type:String,default:"abcdefghijklmnopqrstuvwxyz"},sub:Object,currentLetter:String},data:function(){return{pos:0,splittedText:this.text.split("")}},watch:{text:function(t){this.splittedText=t.split("")}},computed:{letters:function(){var t=this;return console.log("Letters"),this.splittedText.map(function(e){return" $"==e?{cipher:"_",plain:" "}:{cipher:e,plain:t.sub[e]||e}})}},methods:{sendLetter:function(){var t=this.splittedText[this.pos];" $"==t&&(t="_"),this.$emit("select",t)},clickLetter:function(t){var e=t.pos;this.pos=e,this.sendLetter()},key:function(t){var e=t.keyCode,a=t.key;e>=112&&e<=123||(t.preventDefault(),9==e?(this.splittedText.splice(this.pos,0," $"),this.nextPos()):8==e?" $"==this.splittedText[this.pos]&&this.splittedText.splice(this.pos,1):37==e?this.prevPos():38==e||(39==e?this.nextPos():40==e||1==a.length&&" $"!=this.splittedText[this.pos]&&(this.$emit("change",{from:this.currentLetter,to:a}),this.nextPos())),this.sendLetter())},nextPos:function(){this.pos=Math.min(this.splittedText.length-1,this.pos+1)},prevPos:function(){this.pos=Math.max(0,this.pos-1)}},components:{Letter:b}},_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:["text","active-"+t.currentLetter.charCodeAt(0)],attrs:{tabindex:"1"},on:{keydown:t.key}},t._l(t.letters,function(e,i){return a("Letter",{key:i,attrs:{pos:i,lplain:e.plain,lcipher:e.cipher,selected:i==t.pos},on:{click:t.clickLetter}})}))},x=[];function C(t){a("trfv")}var k=!1,L=C,w="data-v-7b3e610a",S=null,A=Object(d["a"])(y,_,x,k,L,w,S),T=A.exports,P={name:"Texte",extends:T,data:function(){return{page:0,pageSize:1e3}},computed:{maxPage:function(){return void 0==this.splittedText?1:Math.floor(this.splittedText.length/this.pageSize)}},methods:{sendLetter:function(){var t=this.pageSize*this.page,e=this.splittedText[this.pos+t];" $"==e&&(e="_"),this.$emit("select",e)},changePage:function(t){this.page=Math.max(Math.min(this.page+t,this.maxPage),0)},paginate:function(t){return t.slice(this.page*this.pageSize,(this.page+1)*this.pageSize)},nextPos:function(){this.pos=Math.min(this.splittedText.length-this.page*this.pageSize-1,this.pageSize-1,this.pos+1)}},components:{Letter:b}},E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:["text","active-"+t.currentLetter.charCodeAt(0)],attrs:{tabindex:"1"},on:{keydown:t.key}},[t.maxPage?a("div",[a("button",{on:{click:function(e){t.changePage(-1)}}},[t._v("Prev")]),a("span",[t._v("Page "+t._s(t.page+1)+" / "+t._s(t.maxPage+1))]),a("button",{on:{click:function(e){t.changePage(1)}}},[t._v("Next")])]):t._e(),a("div",t._l(t.paginate(t.letters),function(e,i){return a("Letter",{key:i,attrs:{pos:i,lplain:e.plain,lcipher:e.cipher,selected:i==t.pos},on:{click:t.clickLetter}})}))])},I=[];function $(t){a("3EwB")}var N=!1,O=$,j="data-v-dd4f3abc",F=null,M=Object(d["a"])(P,E,I,N,O,j,F),q=M.exports,D={name:"LockableLetter",extends:b,props:{locked:{type:Boolean,default:!0}},methods:{onLock:function(t){t.stopPropagation(),this.$emit("lock",{pos:this.pos})}}},B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:["letter","letter-"+t.lcipher.charCodeAt(0)],on:{click:t.onClick}},[a("div",{staticClass:"up",attrs:{disabled:"disabled"}},[t._v(t._s(t.lcipher))]),a("div",{class:["down",{selected:t.selected}]},[t._v(t._s(t.lplain))]),a("div",{class:["locker",{lock:t.locked}],on:{click:t.onLock}},[t._v(t._s(t.locked?"🔒":"🔓"))])])},R=[];function Q(t){a("E/7S")}var W=!1,H=Q,X="data-v-1d8fe75f",z=null,G=Object(d["a"])(D,B,R,W,H,X,z),U=G.exports,J={name:"Alphabet",extends:T,props:{sub:Object,locked:Object,currentLetter:String},methods:{sendLetter:function(){var t=Object.keys(this.sub)[this.pos];this.$emit("select",t)},key:function(t){var e=t.keyCode,a=t.key;console.log(e,a),e>=112&&e<=123||(t.preventDefault(),37==e?this.pos=Math.max(0,this.pos-1):39==e?this.pos=Math.min(this.splittedText.length,this.pos+1):1==a.length&&this.$emit("change",{from:this.currentLetter,to:a}),this.sendLetter())},toggleLock:function(t){var e=t.pos,a=Object.keys(this.sub)[e];this.$emit("lock",{from:a})}},components:{Letter:U}},K=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text",attrs:{tabindex:"1"},on:{keydown:t.key}},t._l(t.sub,function(e,i,s){return a("Letter",{key:s,attrs:{pos:s,lplain:e,lcipher:i,selected:s==t.pos,locked:t.locked[i]},on:{lock:t.toggleLock,click:t.clickLetter}})}))},Y=[],V=!1,Z=null,tt=null,et=null,at=Object(d["a"])(J,K,Y,V,Z,tt,et),it=at.exports,st={name:"Decode",props:{textIn:String,subIn:Object},data:function(){var t={};for(var e in this.subIn)t[e]=!1;return{sub:this.subIn,locked:t,currentLetter:"",text:this.textIn}},computed:{ic:function(){var t=this.text.toLowerCase(),e={},a=0,i=!0,s=!1,n=void 0;try{for(var r,o=t[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var l=r.value;e[l]?e[l]+=1:e[l]=1,a+=1}}catch(t){s=!0,n=t}finally{try{i||null==o.return||o.return()}finally{if(s)throw n}}for(var c=a*(a-1),p=0,d=Object.values(e),u=0;u<d.length;u++){var h=d[u];p+=h*(h-1)/c}return Math.round(1e3*p)/1e3},detectedLanguage:function(){var t={English:.0667,French:.0778},e="English",a=Math.abs(t[e]-this.ic);for(var i in t){var s=Math.abs(t[i]-this.ic);s<a&&(e=i,a=s)}return e},multipleLetters:function(){var t={};for(var e in this.sub){var a=this.sub[e];for(var s in this.sub)e!=s&&a==this.sub[s]&&i["a"].set(t,s,a)}var n=[];for(var r in t)n.push([r,t[r]]);return n.sort(function(t,e){return t[1]>e[1]}).map(function(t){return t[0]}).join("")},missingLetters:function(){var t=[],e=Object.keys(this.sub).join(""),a=Object.values(this.sub).join(""),i=!0,s=!1,n=void 0;try{for(var r,o=e[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var l=r.value;a.includes(l)||t.push(l)}}catch(t){s=!0,n=t}finally{try{i||null==o.return||o.return()}finally{if(s)throw n}}return t},plainText:function(){var t=this;return this.text.split("").map(function(e){return t.sub[e]||e}).join("")},alphabetText:function(){return Object.values(this.sub).join("")}},methods:{changeSub:function(t){var e=t.from,a=t.to;console.log("Change sub"),i["a"].set(this.sub,e,a)},toggleLockSub:function(t){var e=t.from;console.log("Lock sub"),i["a"].set(this.locked,e,!this.locked[e])},setCurrentLetter:function(t){this.currentLetter=t},copySucced:function(){this.$toasted.show("Copied in clipboard",{theme:"primary",position:"bottom-right",duration:2e3})},copyError:function(){this.$toasted.show("Failed to copy in clipboard",{theme:"primary",type:"error",position:"bottom-right",duration:2e3})},actionAuto:function(){console.log("Sub auto")},actionRandom:function(){console.log("Sub random")},back:function(){console.log("back"),this.$emit("return")}},components:{Texte:T,Alphabet:it,TextePage:q}},nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"decode container"},[a("div",{attrs:{id:"left-side"}},[a("div",{staticClass:"back-button"},[a("button",{on:{click:t.back}},[t._v("Back")])]),a("div",{staticClass:"item",attrs:{id:"informations"}},[a("span",{staticClass:"item-title"},[t._v("Informations")]),a("ul",[a("li",[a("strong",[t._v("IC :")]),t._v(" "+t._s(t.ic)+" ("+t._s(t.detectedLanguage)+")\n                    "),a("a",{staticClass:"tooltip preline",attrs:{href:"https://www.dcode.fr/index-coincidence","data-balloon":" Index of Coincidence is a cryptanalysis technique studying the probability of finding repeating letters in an encrypted text.\n                    English : 0.0667\n                    French : 0.0778","data-balloon-length":"xlarge","data-balloon-pos":"right"}},[t._v("?")])]),t._m(0),t._m(1)]),t.ic<.05&&t.text.length>10?a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Polyalphabetic_cipher"}},[a("div",{staticClass:"warning",attrs:{"data-balloon":"A cipher is detected as polyalphabetic when IC is lower than 0.05.\n                For information, the IC of a random text is 0.0385.","data-balloon-length":"large","data-balloon-pos":"right"}},[t._v("\n                    Warning! Polyalphabetic detected\n                ")])]):t._e()]),a("div",{staticClass:"item",attrs:{id:"missing-letters"}},[a("span",{staticClass:"item-title"},[t._v("Missing letters in alphabet")]),a("div",{staticClass:"item-content",attrs:{id:"missing-letters-letters"}},[t._l(t.missingLetters,function(e){return a("div",{key:e,class:{letter:!0,"letter-active":e==t.currentLetter}},[t._v(t._s(e))])}),t.missingLetters.length?t._e():a("div",{staticClass:"noletter"},[t._v("\n                    No missing letters\n                ")])],2)]),a("div",{staticClass:"item",attrs:{id:"multiple-letters"}},[a("span",{staticClass:"item-title"},[t._v("Multiple letters in alphabet")]),a("div",{staticClass:"item-content",attrs:{id:"multiple-letters-letters"}},[a("Texte",{attrs:{text:t.multipleLetters,sub:t.sub,"current-letter":t.currentLetter},on:{change:t.changeSub,select:t.setCurrentLetter}}),t.multipleLetters.length?t._e():a("div",{staticClass:"noletter"},[t._v("\n                    No multiple letters\n                ")])],1)]),t._m(2),a("div",{staticClass:"item",attrs:{id:"debug"}},[a("span",{staticClass:"item-title"},[t._v("Debug")]),a("div",{staticClass:"item-content"},[a("p",[t._v("Letter: "+t._s(t.currentLetter))])])])]),a("div",{attrs:{id:"right-side"}},[a("div",{staticClass:"item",attrs:{id:"alphabet"}},[a("span",{staticClass:"item-title"},[t._v("Alphabet")]),a("div",{staticClass:"item-content",attrs:{id:"alphabet-letters"}},[a("Alphabet",{attrs:{sub:t.sub,locked:t.locked,"current-letter":t.currentLetter},on:{change:t.changeSub,lock:t.toggleLockSub,select:t.setCurrentLetter}}),a("div",{staticClass:"buttons"},[a("button",{on:{click:t.actionAuto}},[t._v("Auto")]),a("button",{on:{click:t.actionRandom}},[t._v("Random")])])],1),a("div",{staticClass:"stickbar"},[a("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.alphabetText,expression:"alphabetText",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.copySucced,expression:"copySucced",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.copyError,expression:"copyError",arg:"error"}],staticClass:"stickbar-item",attrs:{"data-balloon":"Copy the decrypted alphabet","data-balloon-pos":"left"}},[t._v("Copy")])])]),a("div",{staticClass:"item",attrs:{id:"cipher"}},[a("span",{staticClass:"item-title"},[t._v("Cipher")]),a("div",{staticClass:"item-content",attrs:{id:"cipher-letters"}},[a("TextePage",{attrs:{text:t.text,sub:t.sub,"current-letter":t.currentLetter},on:{change:t.changeSub,select:t.setCurrentLetter}})],1),a("div",{staticClass:"stickbar"},[a("span",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.plainText,expression:"plainText",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.copySucced,expression:"copySucced",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.copyError,expression:"copyError",arg:"error"}],staticClass:"stickbar-item",attrs:{"data-balloon":"Copy the decrypted text","data-balloon-length":"medium","data-balloon-pos":"left"}},[t._v("Copy")])])])])])},rt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("strong",[t._v("Selected language :")]),t._v(" French")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("strong",[t._v("Analysis time :")]),t._v(" 0.095 ms")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item",attrs:{id:"biggest-words"}},[a("span",{staticClass:"item-title"},[t._v("Biggest words")]),a("div",{staticClass:"item-content",attrs:{id:"biggest-words-letters"}})])}];function ot(t){a("WBLQ")}var lt=!1,ct=ot,pt="data-v-28638f96",dt=null,ut=Object(d["a"])(st,nt,rt,lt,ct,pt,dt),ht=ut.exports;a("EuXz");function mt(t,e,a){var i=t[e];t[e]=t[a],t[a]=i}function vt(t){for(var e,a=t.length,i=0;i<a;i++){e=i;for(var s=i+1;s<a;s++)t[s].value<t[e].value&&(e=s);i!=e&&mt(t,i,e)}return t}var ft=function(t,e,a){e=e.toUpperCase();var s={},n=!0,r=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done);n=!0){var p=l.value;void 0!=t[p]&&(void 0!=s[p]?s[p]++:s[p]=1)}}catch(t){r=!0,o=t}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}for(var d=Object.keys(s),u=0;u<d.length;u++){var h=d[u];s[h]=s[h]/e.length}for(var m=[],v=Object.keys(s),f=0;f<v.length;f++){var g=v[f];m.push({key:g,value:s[g]})}var b=vt(m).reverse(),y=0,_=!0,x=!1,C=void 0;try{for(var k,L=b[Symbol.iterator]();!(_=(k=L.next()).done);_=!0){var w=k.value,S=w.key;y<a.length&&i["a"].set(t,S,a[y][0]),y++}}catch(t){x=!0,C=t}finally{try{_||null==L.return||L.return()}finally{if(x)throw C}}return t},gt=[["E",.1202],["T",.091],["A",.0812],["O",.0768],["I",.0731],["N",.0695],["S",.0628],["R",.0602],["H",.0592],["D",.0432],["L",.0398],["U",.0288],["C",.0271],["M",.0261],["F",.023],["Y",.0211],["W",.0209],["G",.0203],["P",.0182],["B",.0149],["V",.0111],["K",.0069],["X",.0017],["Q",.0011],["J",.001],["Z",7e-4]],bt={frequenceAnalysis:ft,FRENCH_FREQS:gt},yt={name:"Input",data:function(){return{mode:"manual",choosedLanguage:"English",alphabetType:"predefined",choosedAlphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",ignoreCase:!0,text:""}},computed:{ic:function(){if(""==this.text||this.text.length<=10)return 0;var t=this.text.toLowerCase(),e={},a=0,i=!0,s=!1,n=void 0;try{for(var r,o=t[Symbol.iterator]();!(i=(r=o.next()).done);i=!0){var l=r.value;e[l]?e[l]+=1:e[l]=1,a+=1}}catch(t){s=!0,n=t}finally{try{i||null==o.return||o.return()}finally{if(s)throw n}}for(var c=a*(a-1),p=0,d=Object.values(e),u=0;u<d.length;u++){var h=d[u];p+=h*(h-1)/c}return Math.round(1e3*p)/1e3},detectedLanguage:function(){if(this.ic<.05)return"Polyalphabetic";var t={English:.0667,French:.0778},e="English",a=Math.abs(t[e]-this.ic);for(var i in t){var s=Math.abs(t[i]-this.ic);s<a&&(e=i,a=s)}return e}},methods:{decode:function(t){t.preventDefault(),console.log("Decode start");var e=this.text;this.ignoreCase&&(e=e.toUpperCase());var a=this.choosedAlphabet.split("").reverse(),i=a.filter(function(t,e){return-1==a.indexOf(t,e+1)}).reverse().join("");console.log("Alphabet",i);var s={},n=!0,r=!1,o=void 0;try{for(var l,c=i[Symbol.iterator]();!(n=(l=c.next()).done);n=!0){var p=l.value;s[p]=p}}catch(t){r=!0,o=t}finally{try{n||null==c.return||c.return()}finally{if(r)throw o}}var d=bt.frequenceAnalysis(s,e,bt.FRENCH_FREQS);this.$emit("decode",{text:e,sub:d})},onFileChange:function(t){var e=this,a=t.target.files||t.dataTransfer.files;if(a.length){var i=new FileReader;i.readAsText(a[0],"UTF-8"),i.onload=function(t){t.target.result.length>1e4?(e.text=t.target.result.substr(0,1e4),e.$toasted.show("File ".concat(a[0].name," truncated to 10000 characters"),{theme:"primary",position:"bottom-right",duration:3e3})):(e.text=t.target.result,e.$toasted.show("File ".concat(a[0].name," successfully imported"),{theme:"primary",position:"bottom-right",duration:3e3}))},i.onerror=function(){e.$toasted.show("Failed to import ".concat(a[0].name),{theme:"primary",type:"error",position:"bottom-right",duration:3e3})}}}},components:{}},_t=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"input container"},[a("div",{attrs:{id:"left-side"}},[a("div",{staticClass:"item",attrs:{id:"analysis-options"}},[a("span",{staticClass:"item-title"},[t._v("Analysis options")]),a("form",[a("fieldset",[a("legend",[t._v("Cryptanalysis mode")]),a("p",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.mode,expression:"mode"}],attrs:{type:"radio",id:"manual",name:"cryptanalysis-mode",value:"manual"},domProps:{checked:t._q(t.mode,"manual")},on:{change:function(e){t.mode="manual"}}}),a("label",{attrs:{for:"manual"}},[t._v("Manual (no analysis)")])]),a("p",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.mode,expression:"mode"}],attrs:{type:"radio",id:"semiauto-freq",name:"cryptanalysis-mode",value:"semiauto-freq"},domProps:{checked:t._q(t.mode,"semiauto-freq")},on:{change:function(e){t.mode="semiauto-freq"}}}),a("label",{attrs:{for:"semiauto-freq"}},[t._v("Semi-automatic: frequency analysis")]),a("br")]),a("p",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.mode,expression:"mode"}],attrs:{type:"radio",id:"semiauto-pattern",name:"cryptanalysis-mode",value:"semiauto-pattern"},domProps:{checked:t._q(t.mode,"semiauto-pattern")},on:{change:function(e){t.mode="semiauto-pattern"}}}),a("label",{attrs:{for:"semiauto-pattern"}},[t._v("Semi-automatic: pattern analysis")]),a("br")]),a("p",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.mode,expression:"mode"}],attrs:{type:"radio",id:"semiauto-pattern-fast",name:"cryptanalysis-mode",value:"semiauto-pattern-fast"},domProps:{checked:t._q(t.mode,"semiauto-pattern-fast")},on:{change:function(e){t.mode="semiauto-pattern-fast"}}}),a("label",{attrs:{for:"semiauto-pattern-fast"}},[t._v("Semi-automatic: pattern analysis (fast)")])])])])]),a("div",{staticClass:"item",attrs:{id:"language-options"}},[a("span",{staticClass:"item-title"},[t._v("Language options")]),a("form",[a("select",{directives:[{name:"model",rawName:"v-model",value:t.choosedLanguage,expression:"choosedLanguage"}],attrs:{name:"language",id:"language"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.choosedLanguage=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"English"}},[t._v("English")]),a("option",{attrs:{value:"French"}},[t._v("French")])])]),a("div",{staticClass:"item-section"},[a("strong",[t._v("IC :")]),t._v(" "+t._s(t.ic)+" "),a("span",{directives:[{name:"show",rawName:"v-show",value:0!=t.ic,expression:"ic != 0"}]},[t._v("("+t._s(t.detectedLanguage)+")")]),a("a",{staticClass:"tooltip preline",attrs:{href:"https://www.dcode.fr/index-coincidence","data-balloon":" Index of Coincidence is a cryptanalysis technique studying the probability of finding repeating letters in an encrypted text.\n                                English : 0.0667\n                                French : 0.0778","data-balloon-length":"xlarge","data-balloon-pos":"right"}},[t._v("?")])]),t.ic<.05&&t.text.length>10?a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Polyalphabetic_cipher"}},[a("div",{staticClass:"warning",attrs:{"data-balloon":"A cipher is detected as polyalphabetic when IC is lower than 0.05.\n                For information, the IC of a random text is 0.0385.","data-balloon-length":"large","data-balloon-pos":"right"}},[t._v("\n                    Warning! Polyalphabetic detected\n                ")])]):t._e()]),a("div",{staticClass:"item",attrs:{id:"alphabet-options"}},[a("span",{staticClass:"item-title"},[t._v("Alphabet options")]),a("form",[a("fieldset",[a("legend",[t._v("Alphabet")]),a("p",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.alphabetType,expression:"alphabetType"}],attrs:{value:"predefined",type:"radio",id:"predefined-alphabet-radio",name:"alphabet"},domProps:{checked:t._q(t.alphabetType,"predefined")},on:{change:function(e){t.alphabetType="predefined"}}}),a("label",{attrs:{for:"predefined-alphabet-radio"}},[t._v("Predefined alphabet")])]),a("p",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.alphabetType,expression:"alphabetType"}],attrs:{value:"custom",type:"radio",id:"custom-alphabet-radio",name:"alphabet"},domProps:{checked:t._q(t.alphabetType,"custom")},on:{change:function(e){t.alphabetType="custom"}}}),a("label",{attrs:{for:"custom-alphabet-radio"}},[t._v("Custom alphabet")])]),"predefined"==t.alphabetType?a("p",[a("select",{directives:[{name:"model",rawName:"v-model",value:t.choosedAlphabet,expression:"choosedAlphabet"}],attrs:{name:"predefined-alphabet",id:"predfined-alphabet"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.choosedAlphabet=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"}},[t._v("ABCDEFGHIJKLMNOPQRSTUVWXYZ")]),a("option",{attrs:{value:"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"}},[t._v("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")])])]):"custom"==t.alphabetType?a("p",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.choosedAlphabet,expression:"choosedAlphabet"}],attrs:{type:"text",name:"custom-alphabet",id:"custom-alphabet"},domProps:{value:t.choosedAlphabet},on:{input:function(e){e.target.composing||(t.choosedAlphabet=e.target.value)}}})]):t._e()]),a("fieldset",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.ignoreCase,expression:"ignoreCase"}],attrs:{type:"checkbox",name:"ignore-case",id:"ignore-case"},domProps:{checked:Array.isArray(t.ignoreCase)?t._i(t.ignoreCase,null)>-1:t.ignoreCase},on:{change:function(e){var a=t.ignoreCase,i=e.target,s=!!i.checked;if(Array.isArray(a)){var n=null,r=t._i(a,n);i.checked?r<0&&(t.ignoreCase=a.concat([n])):r>-1&&(t.ignoreCase=a.slice(0,r).concat(a.slice(r+1)))}else t.ignoreCase=s}}}),a("label",{attrs:{for:"ignore-case"}},[t._v("Ignore case")])])])]),a("div",{staticClass:"item",attrs:{id:"debug"}},[a("span",{staticClass:"item-title"},[t._v("Debug")]),a("ul",[a("li",[t._v("mode: "+t._s(t.mode))]),a("li",[t._v("choosedLanguage: "+t._s(t.choosedLanguage))]),a("li",[t._v("choosedAlphabet: "+t._s(t.choosedAlphabet))]),a("li",[t._v("ignoreCase: "+t._s(t.ignoreCase))])])])]),a("div",{attrs:{id:"right-side"}},[t._m(0),a("div",{staticClass:"item",attrs:{id:"cipher"}},[a("span",{staticClass:"item-title"},[t._v("Cipher")]),a("form",{on:{submit:t.decode}},[a("span",{staticClass:"title"},[t._v("📖 Paste your cipher")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],attrs:{name:"cipher-text",id:"cipher-text",placeholder:"Paste your cipher here"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),a("hr"),a("span",{staticClass:"title"},[t._v("📂 Or import your cipher from a file")]),a("input",{attrs:{type:"file",name:"cipher-file",id:"cipher-file"},on:{change:t.onFileChange}}),a("hr"),a("input",{attrs:{type:"submit",value:"Decrypt"}})])])])])},xt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item",attrs:{id:"header"}},[a("span",{staticClass:"title"},[t._v("Monoalphabetic Substitution")]),a("span",{staticClass:"description"},[t._v("Substitution cipher is a cipher that has been in use for many hundreds of years and proven today unsecure. It is a data encryption scheme in which units of the plaintext (generally single letters or pairs of letters of ordinary text) are replaced with other symbols or groups of symbols. It basically consists of substituting every plaintext character for a different ciphertext character.")])])}];function Ct(t){a("kQtA")}var kt=!1,Lt=Ct,wt="data-v-42d95844",St=null,At=Object(d["a"])(yt,_t,xt,kt,Lt,wt,St),Tt=At.exports,Pt={name:"app",data:function(){return{page:0,textIn:"",subIn:{}}},methods:{decode:function(t){var e=t.sub,a=t.text;this.textIn=a,this.subIn=e,this.page=1},back:function(){this.page=0}},components:{Decode:ht,Input:Tt}},Et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[0==t.page?a("Input",{on:{decode:t.decode}}):1==t.page?a("Decode",{attrs:{textIn:t.textIn,subIn:t.subIn},on:{return:t.back}}):t._e()],1)},It=[];function $t(t){a("rpKi")}var Nt=!1,Ot=$t,jt=null,Ft=null,Mt=Object(d["a"])(Pt,Et,It,Nt,Ot,jt,Ft),qt=Mt.exports;i["a"].config.productionTip=!1,i["a"].use(n.a),i["a"].use(o.a),new i["a"]({render:function(t){return t(qt)}}).$mount("#app")},WBLQ:function(t,e){},kQtA:function(t,e){},rpKi:function(t,e){},trfv:function(t,e){}},[0]);
//# sourceMappingURL=app.7a61acf0.js.map