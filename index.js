const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = "<h1>Test</h1>";
    console.log("working...");
    await next();
})

app.listen(3000);