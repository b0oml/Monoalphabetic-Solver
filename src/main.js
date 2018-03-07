import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Toasted from 'vue-toasted'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueClipboard)

Vue.use(Toasted)

new Vue({
  render: h => h(App)
}).$mount('#app')
