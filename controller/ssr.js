const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require('../dist/vue-ssr-server-bundle.json');

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Vue with Typescript</title>${process.env.NODE_ENV === 'production' ? '\n<link rel="stylesheet" href="/app.css">' : ''}
</head>
<body>
  <div id="app"><!--vue-ssr-outlet--></div>
  <script src="/bundle.js"></script>
</body>
</html>`;

const renderer = createBundleRenderer(bundle, { template });

const renderToString = context =>
  new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });

exports.ssr = async (ctx) => {
  const context = { url: ctx.req.url };
  ctx.body = await renderToString(context);
};
