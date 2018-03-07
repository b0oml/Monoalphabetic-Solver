
function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function selectionSort(items){

    var len = items.length,
        min;

    for (let i=0; i < len; i++){

        //set minimum to this position
        min = i;

        //check the rest of the array to see if anything is smaller
        for (let j=i+1; j < len; j++){
            if (items[j].value < items[min].value){
                min = j;
            }
        }

        //if the minimum isn't in the position, swap it
        if (i != min){
            swap(items, i, min);
        }
    }

    return items;
}

/** 
 * Analyse fréquenciel avec un dictionnaire de frequence
*/
const frequenceAnalysis = (sub, text, freqs) => {
    text = text.toLowerCase()

    // Count letters
    const ret = {}
    for(const l of text) {
        if(ret[l] != undefined) {
            ret[l]++
        } else {
            ret[l] = 1
        }
    }
    
    for(const k of Object.keys(ret)) {
        ret[k] = ret[k] / text.length
    }

    const probs = [];
    for (const k of Object.keys(ret)) {
        probs.push({key: k, value: ret[k]})
    }

    // const sortedProbs = probs.sort((a, b) => a[1] < b[1]).sort((a, b) => a[1] < b[1]).sort((a, b) => a[1] < b[1])
    const sortedProbs = selectionSort(probs).reverse()

    let i = 0
    const keys = Object.keys(freqs)
    for(const {key} of sortedProbs) {
        if(i < keys.length) {
            sub[key] = keys[i]
        }
        i++
    }

    return sub
}

const freqs = {
    'e': 0.1202,
    't': 0.0910,
    'a': 0.0812,
    'o': 0.0768,
    'i': 0.0731,
    'n': 0.0695,
    's': 0.0628,
    'r': 0.0602,
    'h': 0.0592,
    'd': 0.0432,
    'l': 0.0398,
    'u': 0.0288,
    'c': 0.0271,
    'm': 0.0261,
    'f': 0.0230,
    'y': 0.0211,
    'w': 0.0209,
    'g': 0.0203,
    'p': 0.0182,
    'b': 0.0149,
    'v': 0.0111,
    'k': 0.0069,
    'x': 0.0017,
    'q': 0.0011,
    'j': 0.0010,
    'z': 0.0007
}






export default {frequenceAnalysis, FRENCH_FREQS: freqs}

const text = "4molocz4tpee4mtu04tjzz4gjmq4ttx3z4e3pm713u7jmmu5x4z48ogj3tyxuttx3z4e3pm7e3jmajutq4zjutm4z486gjug4mjaju4m7qu34a74g4m7yj3utmxzm4tj0ju7jzp3tpxt4y3pqxu3ju7zjy3pawjum4pee4mtu044mm4gu4z473j0juzq4mpta3vy7pzp9x4tq40ju7y43g47734q4z4tj0pu3j04a4dja7u7xq4z4mpx04jxawuee34jzz4gjmqgut4mt430ua44mgj3tolocmx7uzutju75x4aum5z47734tjqe9da4tvt74g4734tapgyzu5x4m4a4ttu7ju7z4gyzpuq4q4xdaz4tawjm944tawj5x4rpx3q4tz4sj03uzz4ajyu7jum49ryjum0umj0ju7q4apx0437yj3z47xq4q4tg4ttj94tawuee34tqxo43j03uzz4tq4xdaz4tx7uzut44t4734apmt7u7x4z4tvt74g4q4awuee34g4m7gjutz4o43rxum4myz4um4a3ut4q4zpee4mtu04tx3zjutm4z4tjzz4gjmqtjrpx7434m7xm4tudu4g4z47734z40g477jm7mptt430ua4tjxdy3ut4tj04axm4queeuaxz74mpx04zz4z48rxumz4ajyu7jum4yjum0umj0ju734tpzxz4y3p1z4g44734t7u7x4z4tq4xdaz4t4zz4ty43gu34m7z4q4a3vy7j94q47pxtz4tg4ttj94tawuee34tajy74tz4o43rxumyj3gua4xdaueu9x3ju7xm3jqup93jgg4jq34tt4yj3z4wjx7apggjmq4g4m7jzz4gjmqjxm4gqj3g4434y434yj3zj3jqup9pmupg473u4qjmtzj349upm34gjx9ut7uzzpzpvjz4t7q4gpm7ququ43jaa4z4343zjgpm744q4tgxmu7upmtypum7g4g4y4mqjm7z4rpx3yj37px7pxzpmm4t7yjt0xz4ezj94t7apq4jqe90dtxahtoloc7w4ezj9utapq4jqe90dtxahtolocz4tqu0utupmtqx94m43jzgjm9umex34m7qpmaapma4m7344tq4tz4ty34gu43trpx3tq4rxumeja4jxypum7y34autpxt4q4az4mawjz4lrxumzpee4mtu04jzz4gjmq4a4zz4au4awpxjzjyp374q4yj3ut47ju7q4eumu7u04g4m7e43g44jz4mm4guypx3mpxta4zz4q4zj0ua7pu34jzzju7tpx03u399"

const sub = {
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
}

console.log(frequenceAnalysis(sub, text, freqs))