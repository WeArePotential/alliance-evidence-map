import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// window.addEventListener('scroll', function(e) {
//   console.log('scroll', window.scrollY)
//   // last_known_scroll_position = window.scrollY;
// })
