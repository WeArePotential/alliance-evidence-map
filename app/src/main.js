import Vue from 'vue'
import ScrollTestApp from './ScrollTestApp.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(ScrollTestApp)
}).$mount('#app')
