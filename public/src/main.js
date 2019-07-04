import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'

import 'vuetify/dist/vuetify.min.css'



Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VeeValidate)

new Vue({
  render: h => h(App),
}).$mount('#app')
