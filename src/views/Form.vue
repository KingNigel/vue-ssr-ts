<template>
  <div class="add" v-loading="loading" element-loading-text="数据提交中">
    <h1 class="add-title">Add a new todo item</h1>
    <el-form
      class="add-form"
      ref="form"
      label-width="80px"
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

      <el-form-item label="限定日期">
        <el-date-picker
          v-model="form.expired"
          type="date"
          placeholder="事项须在此日期前完成"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Form extends Vue {
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

  get formData() {
    return {
      ...this.form,
      tags: this.form.tags.split(' ').slice(0, 3),
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
    fetch('/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.formData),
    }).then(() => {
      this.loading = false;
      this.$router.push('/list');
    });
  }
}
</script>

<style>
.add-title {
  text-align: center;
  font-weight: normal;
  text-transform: uppercase;
}

.add-form {
  width: 500px;
  margin: 0 auto;
}
</style>
