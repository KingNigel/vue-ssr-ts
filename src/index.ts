import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';


sync(store, router);

Vue.use(ElementUI);

export default function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
}
