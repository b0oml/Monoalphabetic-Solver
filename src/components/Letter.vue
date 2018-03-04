<template>
<div class="letter" >
    <div :class="{'up': true}" disabled="disabled">{{ lcipher }}</div>
    <div tabindex="1" ref="input" :class="{'down': true, 'active': isActive}" @keydown="setValue">{{ value }}</div>
</div>
</template>

<script>
export default {
  name: 'Letter',
  props: {
    lcipher: String,
    lplain: String,
  },
  data() {
    return {
        isActive: false,
        value: this.lplain
    }
  },
  methods: {
      setValue(event) {
          console.log(event);
          this.value = event.key
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
.letter *:focus {
    font-weight: 700;
    color: #c00;
}

/* .A{
    color: #c00;
} */
</style>
