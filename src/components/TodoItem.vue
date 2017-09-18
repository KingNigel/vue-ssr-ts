<template>
  <el-card class="todo">
    <div class="todo__header">
      <h2 class="todo__title">{{ todo.title }}</h2>
      <el-tag class="todo__tag" type="primary" v-for="tag in todo.tags" :key="tag">
        {{ tag }}
      </el-tag>
    </div>
    <p class="todo__content">{{ todo.content }}</p>
    <div class="todo__edit">
      <span class="todo__tip" v-html="tipText(todo)"></span>
      <el-button type="primary" @click="complete(todo._id)" v-if="isShowCompleteButton(todo)">完成</el-button>
      <el-button type="danger" @click="remove(todo._id)">删除</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import isPast from 'date-fns/is_past';
import isFuture from 'date-fns/is_future';
import distanceInWords from 'date-fns/distance_in_words';

@Component({
  props: {
    todo: Object
  }
})
export default class TodoItem extends Vue {

  isShowCompleteButton(todo: Todo) {
    if (todo.completed) return false;
    if (todo.expired == null) return true;
    return isFuture(todo.expired);
  }

  tipText({ expired, completed }: Todo) {
    if (completed) {
      return '<span style="color: #13CE66;">已完成<span>';
    }

    if (expired == null) {
      return '不限期';
    }

    if (isPast(expired)) {
      return '<span style="color: #F7BA2A;">事项已过期<span>';
    }

    const words = distanceInWords(new Date(), expired)
      .replace('almost', '将近')
      .replace(/over(.*)years?/, '$1 年多')
      .replace('about', '大约')
      .replace('less than', '不到')
      .replace(/minutes?/, '分钟')
      .replace(/hours?/, '小时')
      .replace(/days?/, '天')
      .replace(/months?/, '个月')
      .replace(/years?/, '年')
      .replace(/\s/g, '');
    return `${words}后过期`;
  }

  complete(id: string) {
    (this as any).$confirm('确定已完成此事项吗？', { type: 'success' })
      .then(() => this.$store.dispatch('completeTodo', id));
  }

  remove(id: string) {
    (this as any).$confirm('确认要删除此事项吗？', { type: 'warning' })
      .then(() => this.$store.dispatch('removeTodo', id));
  }
}
</script>

<style>
.todo__header {
  display: flex;
}

.todo__title {
  margin: 0 auto 0 0;
  font-size: 1.25em;
  font-weight: normal;
}

.todo__tag {
  margin-left: 1em;
}

.todo__content {
  height: 100px;
  overflow: auto;
  color: #8492A6;
  font-size: 0.8125em;
  line-height: 1.6;
}

@media screen and (max-width: 800px) {
  .todo__content {
    height: auto;
    margin-bottom: 2em;
  }
}

.todo__edit {
  display: flex;
  align-items: center;
  height: 36px;
}

.todo__tip {
  margin-right: auto;
  font-size: 0.8125em;
}
</style>
