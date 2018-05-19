import Vue from 'vue'


function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function selectionSort(items) {

    var len = items.length,
        min;

    for (let i = 0; i < len; i++) {

        //set minimum to this position
        min = i;

        //check the rest of the array to see if anything is smaller
        for (let j = i + 1; j < len; j++) {
            if (items[j].value < items[min].value) {
                min = j;
            }
        }

        //if the minimum isn't in the position, swap it
        if (i != min) {
            swap(items, i, min);
        }
    }

    return items;
}

/**
 * Analyse fréquenciel avec un dictionnaire de frequence
 */
const frequenceAnalysis = (sub, text, freqs) => {
    text = text.toUpperCase()

    // Count letters
    const ret = {}
    for (const l of text) {
        if (sub[l] == undefined) {
            continue
        }
        if (ret[l] != undefined) {
            ret[l]++
        } else {
            ret[l] = 1
        }
    }

    for (const k of Object.keys(ret)) {
        ret[k] = ret[k] / text.length
    }

    const probs = [];
    for (const k of Object.keys(ret)) {
        probs.push({
            key: k,
            value: ret[k]
        })
    }

    // const sortedProbs = probs.sort((a, b) => a[1] < b[1]).sort((a, b) => a[1] < b[1]).sort((a, b) => a[1] < b[1])
    const sortedProbs = selectionSort(probs).reverse()

    let i = 0
    for (const {
            key
        } of sortedProbs) {
        if (i < freqs.length) {
            Vue.set(sub, key, freqs[i][0])
        }
        i++
    }

    return sub
}

const freqs = [
    ['E', 0.1202],
    ['T', 0.0910],
    ['A', 0.0812],
    ['O', 0.0768],
    ['I', 0.0731],
    ['N', 0.0695],
    ['S', 0.0628],
    ['R', 0.0602],
    ['H', 0.0592],
    ['D', 0.0432],
    ['L', 0.0398],
    ['U', 0.0288],
    ['C', 0.0271],
    ['M', 0.0261],
    ['F', 0.0230],
    ['Y', 0.0211],
    ['W', 0.0209],
    ['G', 0.0203],
    ['P', 0.0182],
    ['B', 0.0149],
    ['V', 0.0111],
    ['K', 0.0069],
    ['X', 0.0017],
    ['Q', 0.0011],
    ['J', 0.0010],
    ['Z', 0.0007]
]

export default {
    frequenceAnalysis,
    FRENCH_FREQS: freqs
}