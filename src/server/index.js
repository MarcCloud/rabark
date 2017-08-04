const koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const {vueHandler} = require('./middlewares/vue');
const HtmlWriterStream = require('./html-writer-stream');

/*
* HTTP server class.
*/
exports.server = function server (config) {
  return {
    server: null,
    start () {
      return (async () => {
      if (this.server) return this;

      const app = new koa();

      // serve static assets
      let staticPath = 'dist/client';
      app.use(serve(staticPath));

      // basic middlewware to set config on ctx
      app.use(async (ctx, next) => {
        ctx.config = config
        await next();
      });

      // streaming from root route
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
