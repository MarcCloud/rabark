exports.vueBundleRenderer = function () {
  let {bundleRenderer} = require('koa-vue-builder');

  return bundleRenderer(`${__dirname}/../../../dist/server/bundle.js`);
}

exports.vueDevServer = function (config) {
  let {build} = config;
  let {devServer} = require('./koa-vue-dev');

  return devServer({
    server: build({mode: 'server'}),
    client: build({mode: 'client'})
  });
}

exports.vueHandler = function (config) {
  let isDev = config.env === 'development';

  if (isDev) {
    return exports.vueDevServer(config);
  } else {
    return exports.vueBundleRenderer(config);
  }
};
