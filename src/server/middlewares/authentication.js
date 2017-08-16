const router = require('koa-router')();
const fb = require('../libs/fb');

router.get('/auth/handle_facebook', async (ctx)=>{
    fb.setAccessToken(ctx.query.access_token);
    const result = await new Promise((resolve, reject) => {
        fb.api('/me', { fields: 'id,name,picture.type(large)' }, function (res) {
            console.log(res);
            if (!res || res.error) {
              console.log(!res ? 'error occurred' : res.error);
              reject(res.error)
            }
            resolve(res)
          });
    });
    ctx.body = JSON.stringify({ id: result.id, name: result.name, picture: result.picture });
})

module.exports = router;
