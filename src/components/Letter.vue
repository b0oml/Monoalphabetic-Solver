<template>
<div :class="['letter', 'letter-'+lcipher.charCodeAt(0)]" @click="onClick">
    <div class="up" disabled="disabled">{{ lcipher }}</div>
    <div :class="['down', {'selected': selected}]">{{ lplain }}</div>
</div>
</template>

<script>
export default {
    name: "Letter",
    props: {
        pos: Number,
        lcipher: String,
        lplain: String,
        selected: Boolean
    },
    methods: {
        onClick() {
            this.$emit("click", { pos: this.pos });
        }
    }
};
</script>

<style lang="scss">
.letter {
    cursor: text;
    vertical-align: top;
    display: inline-block;
    margin: -1px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);

    .up,
    .down {
        width: 12px;
        height: 20px;
        padding: 0px 3px 0px 3px;
        background: linear-gradient(#fcf8ea, #ffffff, #f8efd3);
        font: normal 12px/22px "Lucida Console", "Trebuchet MS", Arial,
            Helvetica, sans-serif;
        text-align: center;
        /* text-transform: uppercase; */
        color: #63562e;
        border: #d0be90 solid 1px;
    }
    .up {
        margin-bottom: -1px;
        opacity: 0.5;
    }

    &:hover .up,
    &:hover .down {
        font-weight: 700;
    }

    // &.active .up, &.active .down {
    //     font-weight: 700;
    //     color: #d00;
    // }

    .selected {
        background: linear-gradient(#d00, #e00, #c80000);
        color: #fff !important;
    }
}

@for $i from 0 through 255 {
    .active-#{$i} .letter-#{$i} div {
        font-weight: 700;
        color: #d00;
    }
}
</style>
