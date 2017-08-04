const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const session = require('koa-session');
const mount = require('koa-mount');
const Grant = require('grant-koa');
const koaqs = require('koa-qs');
const {vueHandler} = require('./middlewares/vue');
const authentication = require('./middlewares/authentication');
const HtmlWriterStream = require('./html-writer-stream');

exports.server = function server (config) {
  return {
    server: null,
    start () {
      return (async () => {
      if (this.server) return this;

      const grant = new Grant(require('../../config/auth'));
      const app = new koa();
      koaqs(app);
      app.keys = ['grant']
      app.use(session(app))
      app.use(mount(grant))
      let staticPath = 'dist/client';
      app.use(serve(staticPath));
      app.use(authentication.routes());
      // basic middlewware to set config on ctx
      app.use(async (ctx, next) => {
        ctx.config = config
        await next();
      });
      router.get('/', async (ctx, next) => {
        ctx.type = 'html';
        if (ctx.vue) {
          let stream = ctx.vue.renderToStream();
          let htmlWriter = new HtmlWriterStream();
          ctx.body = stream.pipe(htmlWriter);
        } else {
          console.log('no .vue object found on ctx. No SSR streaming possible :()');
        }
        await next();
      });

      app
        .use(vueHandler(config))
        .use(router.routes())
        .use(router.allowedMethods());

      let {serverPort, serverHost} = config;
      this.server = await app.listen(serverPort, serverHost);
      return this;
      })();
    },
    stop () {
      return (async () => {
        if (!this.server) return this;
        await this.server.close();
        this.server = null;
        return this;
      })();
    }
  }
}
