import Vue from 'vue';
import Router from 'vue-router';
import Form from './views/Form.vue';
import List from './views/List.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/add',
      component: Form,
    },
    {
      path: '/list',
      component: List,
    },
  ],
});
