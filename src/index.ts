import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import 'normalize.css';
import {
  Menu, MenuItem,
  Form, FormItem, Input, Button, DatePicker,
  Tabs, TabPane,
  Card,
  Loading, MessageBox,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css';

sync(store, router);

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Card);
Vue.use(Loading.directive);

(Vue.prototype as any).$loading = Loading.service;
(Vue.prototype as any).$confirm = MessageBox.confirm;

export default function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return { app, router, store };
}
