/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import { getTodos, addTodo, completeTodo, removeTodo } from './api';

Vue.use(Vuex);


export default new Vuex.Store<{ todos: Todo[] }>({
  state: {
    todos: [],
  },

  mutations: {
    loadTodos(state, todos) {
      state.todos = todos;
    },

    addTodo(state, todo) {
      state.todos = [...state.todos, todo];
    },

    /* eslint-disable no-underscore-dangle */
    completeTodo(state, id) {
      state.todos = state.todos.map((todo: Todo) => (
        (todo._id === id)
          ? ({
            ...todo,
            completed: true,
          })
          : todo
      ));
    },

    removeTodo(state, id) {
      state.todos = state.todos.filter((todo: Todo) => todo._id !== id);
    },
  },

  actions: {
    getTodos({ commit }) {
      return getTodos().then(({ todos }: { todos: Todo[] }) =>
        commit('loadTodos', todos),
      );
    },

    addTodo({ commit }, data) {
      return addTodo(data)
        .then(({ todo }: { todo: Todo }) => commit('addTodo', todo));
    },

    completeTodo({ commit }, id) {
      return completeTodo().then(() => commit('completeTodo', id));
    },

    removeTodo({ commit }, id) {
      return removeTodo(id).then(() => commit('removeTodo', id));
    },
  },
});
