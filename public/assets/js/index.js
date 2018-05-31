'use strict';

import Vue from 'vue';

import App from './components/App.vue';
import filters from './filters.js';
import router from './router'

// new Vue({
//   el: '#vueApp',
//   router,
//   template: '<App/>',
//   components: { App }
// })

// new Vue(App).$mount('#vueApp');

new Vue({
  router,
  el: '#vueApp', // equivalent to mount
  render: h => h(App)
})
