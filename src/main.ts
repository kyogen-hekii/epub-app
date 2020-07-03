import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.prototype.$axios = axios;

// Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
