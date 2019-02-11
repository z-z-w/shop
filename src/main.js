// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/js/rem.js'

import store from './vuex/store'

Vue.config.productionTip = false

//引入vant
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

//引入lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/loading.gif'),
  loading: require('./assets/images/loading.gif'),
  // attempt: 1,
  listenEvents: [ 'scroll' ]
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
