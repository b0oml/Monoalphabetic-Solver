<template>
<div :class="['letter', 'letter-'+lcipher.charCodeAt(0)]" @click="onClick">
    <div class="up" disabled="disabled">{{ lcipher }}</div>
    <div :class="['down', {'selected': selected}]">{{ lplain }}</div>
    <div :class="['locker', {'lock': locked}]" @click="onLock">{{ locked ? '&#x1f512;' : '&#128275;' }}</div>
</div>
</template>

<script>
import Letter from './Letter.vue'
export default {
    name: 'LockableLetter',
    extends: Letter,
    props: {
        locked: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onLock(e) {
            e.stopPropagation()
            this.$emit('lock', {pos: this.pos})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.locker {
    width: 22px;
    height: 16px;
    padding: 2px 0;
    font-size: 12px;
    text-align: center;
    color: #63562E;
    cursor: pointer;
    background-color: orangered;
}
.locker.lock {
    background-color: greenyellow;
}
</style>
