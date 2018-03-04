<template>
<div class="letter" @click="onClick">
    <div :class="{'up': true}" disabled="disabled">{{ lcipher }}</div>
    <div :class="{'down': true, 'active': active, 'selected': selected}">{{ lplain }}</div>
</div>
</template>

<script>
export default {
    name: 'Letter',
    props: {
        pos: Number,
        lcipher: String,
        lplain: String,
        active: Boolean,
        selected: Boolean
    },
    methods: {
        onClick() {
            this.$emit('click', {pos: this.pos})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.letter{
    vertical-align: top;
    display:inline-block;
    margin: -1px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
.up, .down{
    width: 12px;
    height: 20px;
    padding: 0px 3px 0px 3px;
    background: linear-gradient(#fcf8ea,#ffffff,#f8efd3);
    font: normal 12px/22px "Lucida Console", "Trebuchet MS", Arial, Helvetica, sans-serif;
    text-align: center;
    text-transform: uppercase;
    color: #63562E;
    border: #D0BE90 solid 1px;
}
.up{
    margin-bottom: -1px;
    opacity: 0.5;
}
.up:hover, .up:hover ~ .down, .down:hover{
    font-weight: 700;
}
.letter .selected {
    outline: 1px solid black;
}
.letter .active {
    font-weight: 700;
    color: #fff;
    background: linear-gradient(#c00,#d00,#b00);
}

/* .A{
    color: #c00;
} */
</style>
