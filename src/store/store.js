/**
 * Use \u001b to store fake space
 */
import Vue from 'vue'

import analyse from '../analyse'

const ESCAPE_CHAR = "\u001b"

// initial state
const state = {
    text: "",
    substitution: {},
    locked: {},
    currentLetter: "",
    page: 0,
    //Settings
    ignoreCase: false,
    loadingAnalysis: false,
}

// getters
const getters = {
    //Basic getters
    page: state => state.page,
    text: state => state.text,
    substitution: state => state.substitution,
    locked: state => state.locked,
    currentLetter: state => state.currentLetter,
    splittedText: state => state.text.split(""),
    loadingAnalysis: state => state.loadingAnalysis,
    settings: ({
        ignoreCase
    }) => ({
        ignoreCase
    }),
    //Advenced getters
    ic: (state) => {
        const text = state.text.toLowerCase();
        const letters = {};
        let lettersCount = 0;
        for (const l of text) {
            if (!letters[l]) {
                letters[l] = 1;
            } else {
                letters[l] += 1;
            }
            lettersCount += 1;
        }

        const denom = lettersCount * (lettersCount - 1);

        let ret = 0.0;
        for (const v of Object.values(letters)) {
            ret += v * (v - 1) / denom;
        }
        return Math.round(ret * 1000) / 1000;
    },
    detectedLanguage: (state, getters) => {
        const ics = {
            English: 0.0667,
            French: 0.0778
            // "Allemand": 0,0762,
            // "Espagnol": 0,0770,
        };
        let best = "English";
        let score = Math.abs(ics[best] - getters.ic);
        for (let key in ics) {
            let currentScore = Math.abs(ics[key] - getters.ic);
            if (currentScore < score) {
                best = key;
                score = currentScore;
            }
        }
        return best;
    },
    multipleLetters: (state) => {
        const ret = {};
        for (const cipher in state.substitution) {
            const plain = state.substitution[cipher];
            for (const cipher2 in state.substitution) {
                if (cipher != cipher2 && plain == state.substitution[cipher2]) {
                    Vue.set(ret, cipher2, plain);
                }
            }
        }

        //Sort by value and return keys
        const sortable = [];
        for (const k in ret) {
            sortable.push([k, ret[k]]);
        }

        return sortable
            .sort((a, b) => a[1] > b[1])
            .map(x => x[0])
            .join("");
    },
    missingLetters: (state) => {
        const ret = [];
        const cipher = Object.keys(state.substitution).join("");
        const plain = Object.values(state.substitution).join("");
        for (const l1 of cipher) {
            if (!plain.includes(l1)) {
                ret.push(l1);
            }
        }
        return ret;
    },
    plainText: (state) => {
        return state.text
            .split("")
            .map(x => {
                if (x == "\u001b") {
                    return " "
                } else {
                    return state.substitution[x] || x
                }
            })
            .join("");
    },
    alphabetText: (state) => {
        return Object.values(state.substitution).join("");
    },
}

// actions
const actions = {
    addFake({
        commit,
        state
    }, position) {
        commit("setText", [state.text.slice(0, position), ESCAPE_CHAR, state.text.slice(position)].join(''))
    },
    removeFake({
        commit,
        state
    }, position) {
        if (state.text[position] == ESCAPE_CHAR)
            commit("setText", state.text.slice(0, position) + state.text.slice(position + 1))
    },
    startDecode({
        commit
    }, {
        text,
        alphabet,
        settings: {
            ignoreCase,
            mode,
            language
        }
    }) {
        commit('setLoadingAnalysis', true)

        //Compuet text
        if (ignoreCase) {
            text = text.toUpperCase();
        }

        commit("setText", text);
        commit("setSettings", {
            ignoreCase
        });

        analyse.analyse(text, alphabet, {
                ignoreCase,
                mode,
                language
            })
            .then(sub => {
                const keys = Object.keys(sub)
                if (keys.length != 0) {
                    commit("setSubstitution", sub);
                    commit("setCurrentLetter", keys.pop());
                    commit('setLoadingAnalysis', false)
                    commit("setPage", 1);
                }
            })
    },
}

// mutations
const mutations = {
    changeSub(state, {
        from,
        to
    }) {
        if (state.ignoreCase) {
            to = to.toUpperCase()
        }

        state.substitution = {
            ...state.substitution,
            [from]: to
        }
    },
    setCurrentLetter(state, letter) {
        state.currentLetter = letter;
    },
    setSubstitution(state, substitution) {
        state.substitution = substitution
        for (let k in substitution) {
            state.locked[k] = false;
        }
    },
    setText(state, text) {
        if (state.ignoreCase) {
            text = text.toUpperCase()
        }
        state.text = text
    },
    setPage(state, page) {
        state.page = page
    },
    setSettings(state, {
        ignoreCase
    }) {
        state.ignoreCase = ignoreCase
    },
    setLoadingAnalysis(state, loading) {
        state.loadingAnalysis = loading
    },
    toggleLock(state, letter) {
        if (state.locked.hasOwnProperty(letter)) {
            state.locked[letter] = !state.locked[letter];
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}