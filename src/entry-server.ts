import createApp from './index';

export default (context: any) =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject(new Error('code: 404'));
      }

      return Promise.all(
        matchedComponents.map(
          (c: any) =>
            c.asyncData &&
            c.asyncData({
              store,
              route: router.currentRoute,
            }),
        ),
      )
        .then(() => {
          // eslint-disable-next-line
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
