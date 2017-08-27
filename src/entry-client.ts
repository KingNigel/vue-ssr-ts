import { Loading } from 'element-ui';
import createApp from './index';

const { app, router, store } = createApp();

/* eslint-disable no-underscore-dangle */
if (window.__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matchedComponents = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activatedComponents = matchedComponents.filter(
      (c, i) => diffed || (diffed = prevMatched[i] !== c),
    );

    if (!activatedComponents.length) {
      return next();
    }

    const loadingInstance = Loading.service({
      fullscreen: true,
      lock: true,
    });

    return Promise.all(
      activatedComponents.map(
        (c: any) => c.asyncData && c.asyncData({ store, route: to }),
      ),
    )
      .then(() => {
        loadingInstance.close();
        next();
      })
      .catch(next);
  });

  app.$mount('#app');
});

if (module.hot) {
  module.hot.accept();
}
