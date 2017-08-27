/* eslint-disable */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'element-ui';

declare var module: any;

interface Window {
  __INITIAL_STATE__?: object
}

interface Todo {
  _id: string,
  title: string,
  content?: string,
  tags: string[],
  expired?: Date,
  completed?: boolean,
}
