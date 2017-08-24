<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class App extends Vue {}
</script>

<style>
.app {
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}
</style>
