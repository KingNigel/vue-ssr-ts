<template>
  <div class="about">
    <h1>应用说明</h1>
    <p>这是一个示例应用。主要是为了尝试Vue与Typescript的结合使用，以及Vue的服务端渲染，并认识Koa与Express的不同。
      <br> 整体而言，Typescript在Vue框架下虽基本可用，但很多细节体验非常糟糕。类型推倒在很多地方失效，Linter（无论是Tslint还是Eslint）也没办法很好地工作。
      <br> Vue的SSR要考虑同构的问题
    </p>

    <p>以下是本应用中所使用到的技术/工具：</p>
    <ul>
      <li>
        <h2>客户端</h2>
        <ul>
          <li>Typescript</li>
          <li>Vue / Vue Router / Vuex</li>
          <li>Element UI</li>
        </ul>
      </li>
      <li>
        <h2>服务端</h2>
        <ul>
          <li>Node.js</li>
          <li>Koa</li>
          <li>MongoDB / Mongoose</li>
          <li>Vue Server Renderer</li>
        </ul>
      </li>
      <li>
        <h2>辅助 / 构建</h2>
        <ul>
          <li>Webpack</li>
          <li>Eslint</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style>
.about {
  line-height: 1.8;
}

.about h1 {
  font-size: 1.75rem;
  font-weight: normal;
  text-align: center;
}

.about h2 {
  font-size: 1.25rem;
  font-weight: normal;
  margin: 1em 0 0;
}
</style>

