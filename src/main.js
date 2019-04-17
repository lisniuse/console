import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import HeyUI from 'heyui';
import 'heyui/themes/index.css';

Vue.use(HeyUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
