<template>
  <div class="list">
    <h1 class="list__title">Todo List</h1>
    <ul class="list__list">
      <li class="list__item" v-for="todo in todos" :key="todo.title">
        <el-card class="list__item__card">
          <div class="list__item__header">
            <h2 class="list__item__title">{{ todo.title }}</h2>
            <el-tag class="list__item__tag" type="primary" v-for="tag in todo.tags" :key="tag">
              {{ tag }}
            </el-tag>
          </div>
          <p class="list__item__content">{{ todo.content }}</p>
          <div class="list__item__edit" v-if="expired(todo.expired) > 0">
            <span class="list__item__expired">离过期还有{{ expired(todo.expired) }}天</span>
            <el-button type="primary">完成</el-button>
            <el-button type="danger">删除</el-button>
          </div>
          <div class="list__item__edit" v-else>
            <span class="list__item__expired" style="color: #F7BA2A;">事项已过期</span>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { differenceInDays } from 'date-fns'

@Component({})
export default class List extends Vue {
  todos = [];

  expired(date: string) {
    const today = new Date();
    const target = new Date(date);
    return differenceInDays(target, today);
  }

  created() {
    fetch('/todo')
      .then(res => res.json())
      .then(({ todos }) => {
        this.todos = todos;
      });
  }
}
</script>

<style>
.list__title {
  margin-bottom: 1.4em;
  text-align: center;
  font-weight: normal;
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
}

.list__item__header {
  display: flex;
}

.list__item__title {
  margin: 0 auto 0 0;
  font-size: 1.25em;
  font-weight: normal;
}

.list__item__tag {
  margin-left: 1em;
}

.list__item__content {
  height: 100px;
  overflow: auto;
  color: #8492A6;
  font-size: 0.8125em;
  line-height: 1.6;
}

.list__item__edit {
  display: flex;
  align-items: center;
  height: 36px;
}

.list__item__expired {
  margin-right: auto;
  font-size: 0.75em;
}
</style>
