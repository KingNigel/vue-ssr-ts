<template>
  <div class="add" v-loading="loading" element-loading-text="数据提交中">
    <el-form
      class="add-form"
      ref="form"
      label-width="80px"
      label-position="top"
      :model="form"
      :rules="rules"
      @submit.native.prevent="validate"
    >
      <el-form-item label="事项标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="事项描述" prop="content">
        <el-input type="textarea" v-model="form.content" placeholder="请输入简要的描述" :rows="4" :maxlength="90"></el-input>
      </el-form-item>

      <el-form-item label="事项标签" prop="tags">
        <el-input v-model="form.tags" placeholder="多个标签用空格隔开，最多可输入三个标签，多出无效"></el-input>
      </el-form-item>

      <el-form-item label="过期时间">
        <el-date-picker
          v-model="form.expired"
          type="date"
          placeholder="不填则无限期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交事项</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Form extends Vue {
  /* eslint-disable no-undef */
  form = {
    title: '',
    content: '',
    tags: '',
    expired: '',
  };

  rules = {
    title: [
      { required: true, message: '待办事项不能为空' },
    ],
    content: [
      { max: 90, message: '描述不得多于90个字符' },
    ],
  };

  loading = false;
  /* eslint-enable */

  get formData() {
    return {
      ...this.form,
      tags: this.form.tags
        .trim()
        .split(' ')
        .filter(tag => tag !== '')
        .slice(0, 3),
    };
  }

  validate() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        this.submit();
      }
    });
  }

  submit() {
    this.loading = true;
    this.$store.dispatch('addTodo', JSON.stringify(this.formData))
      .then(() => {
        this.loading = false;
        this.$router.push('/list');
      });
  }
}
</script>

<style>
.add-form {
  width: 500px;
  max-width: 100%;
  margin: 2.6em auto 0;
}
</style>
