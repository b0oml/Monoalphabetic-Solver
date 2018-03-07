<template>
  <div id="app">
    <Input v-if="page == 0" @decode="decode"/>
    <Decode v-else-if="page == 1" @return="back" :textIn="textIn" :subIn="subIn"/>
  </div>
</template>

<script>
import Decode from './components/Decode.vue'
import Input from './components/Input.vue'

export default {
  name: 'app',
  data() {
    return {
      page: 0,
      textIn: "",
      subIn: {}
    }
  },
  methods: {
    decode({sub, text}) {
        this.textIn = text
        this.subIn = sub

        // Open decode page
        this.page = 1
    },
    back() {
        this.page = 0
    }
  },
  components: {
    Decode,
    Input,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato|Dancing+Script');

html, body{
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
}

.container{
    display: flex;
    min-height: 100%;
}

#left-side, #right-side{
    flex-direction: column;
}

#left-side{
    z-index: 3;
    flex: 1;
    min-width: 300px;
    background-color: #ece4bc;
    box-shadow: 2px 0 5px rgb(236, 228, 188);
    border-right: 1px solid #e3d9aa;
}
#right-side{
    z-index: 1;
    flex: 3;
    padding-left: 8px;
    background-color: #f8f2d7;
}

.item{
    position: relative;
    background-color: #fff;
    flex: 1 100%;
    min-height: 30px;
    margin: 5px;
    padding: 0 20px 10px;
}
.item-title{
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    padding: 7px 0;
    border-bottom: 1px solid #f9f5dd;
    text-align: center;
    font-size: 12px;
    color: #c5b437;
    text-transform: uppercase;
}

#informations ul{
    font-size: 13px;
    color: #a29429;
    line-height: 19px;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
#informations ul strong{
    color: #d7b915;
    font-weight: 300;
}

.stickbar{
    position: absolute;
    top: 0;
    right: 0;
}
.stickbar-item{
    display: inline-block;
    font-size: 14px;
    padding: 6px 7px;
    cursor: pointer;
    color: #d8d2a7;
}
.stickbar-item:hover{
    background-color: #ece4bc;
    color: #fff;
}

.tooltip{
    display: inline-block;
    background-color: #ece4bc;
    margin-left: 4px;
    padding: 1px 4px 0;
    height: 16px;
    color: #fff;
    text-decoration: none;
}
.tooltip:hover{
    background-color: #e0d7af;
}
.preline[data-balloon]:after{
    white-space: pre-line !important;
}

.item-content {
    padding: 6px 8px;
}

@media screen and (max-width: 860px) {
    .container{
        flex-direction: column;
    }
    #left-side{
        order: 2;
    }
}

</style>
