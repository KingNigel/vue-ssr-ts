<template>
  <div class="list">
    <el-card class="list__empty" v-if="todos.length <= 0">
      您还未添加任何事项，<router-link to="/add">前往添加</router-link>
    </el-card>
    <el-tabs class="list__tabs" v-model="active" v-else>
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="待完成" name="todo"></el-tab-pane>
      <el-tab-pane label="已完成" name="completed"></el-tab-pane>
      <el-tab-pane label="已过期" name="expired"></el-tab-pane>
    </el-tabs>
    <transition-group class="list__list" name="list" tag="ul">
      <li class="list__item" v-for="todo in FilteredTodos" :key="todo.title">
        <todo-item :todo="todo"></todo-item>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { isPast, isFuture } from 'date-fns';
// eslint-disable-next-line
import TodoItem from '../components/TodoItem.vue';

@Component({
  components: { TodoItem }
})
class List extends Vue {
  /* eslint-disable no-undef */
  active = 'todo';
  /* eslint-enable */

  get todos(): Todo[] {
    return this.$store.state.todos;
  }

  get FilteredTodos(): Todo[] {
    switch (this.active) {
      case 'todo':
        return this.todos
          .filter(({ expired }) => !expired || isFuture(expired))
          .filter(todo => !todo.completed);

      case 'completed':
        return this.todos
          .filter(todo => todo.completed);

      case 'expired':
        return this.todos
          .filter(({ expired }) => expired && isPast(expired));

      case 'all':
      default:
        return this.todos;
    }
  }
}

(List as any).asyncData = ({ store }: any) => store.dispatch('getTodos');

export default List;
</script>

<style>
.list__empty {
  width: 30em;
  margin: 0 auto;
  text-align: center;
}

.list__tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
}

.list__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0 2em;
  margin: 0;
}

.list__item {
  flex: none;
  width: 47%;
  margin-bottom: 2em;
  transition: all 1s;
}

@media screen and (max-width: 800px) {
  .list__item {
    flex: 100%;
  }
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  transition: 0.6s;
}

.list-leave-active {
  position: absolute;
}
</style>
