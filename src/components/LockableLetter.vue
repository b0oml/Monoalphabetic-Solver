<template>
<div :class="['letter', 'letter-'+lcipher.charCodeAt(0)]" @click="onClick">
    <div class="up" disabled="disabled">{{ lcipher }}</div>
    <div :class="['down', {'selected': selected}]">{{ lplain }}</div>
    <div :class="['locker', {'lock': locked}]" @click="onLock">{{ locked ? '&#x1f512;' : '&#128275;' }}</div>
</div>
</template>

<script>
export default {
    name: "LockableLetter",
    props: {
        lcipher: String,
        lplain: String,
        selected: Boolean,
        locked: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onClick() {
            this.$emit("click", { cipher: this.lcipher });
        },
        onLock() {
            this.$emit("lock", { cipher: this.lcipher });
        }
    }
};
</script>

<style scoped>
.locker {
    width: 22px;
    height: 16px;
    padding: 2px 0;
    font-size: 12px;
    text-align: center;
    color: #63562e;
    cursor: pointer;
    background-color: #eae0c3;
    opacity: 0.5;
}
.locker.lock {
    background-color: #ded0a8;
    opacity: 1;
}
</style>
