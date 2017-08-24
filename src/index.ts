import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import ElementUI from 'element-ui';
import 'normalize.css';
import 'element-ui/lib/theme-default/index.css';
import './style.css';

Vue.use(ElementUI);

// tslint:disable-next-line
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

declare var module: { hot: { accept: any } };
if (module.hot) {
  module.hot.accept();
}
