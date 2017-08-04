const router = require('koa-router')();

router.get('/auth/handle_facebook', async (ctx)=>{
    console.log(ctx.query);
    ctx.body = JSON.stringify(ctx.query);
})

module.exports = router;