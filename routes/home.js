const { getRouter } = require('./router');

const router = getRouter();

router.get("/", async (ctx, next) => {
    ctx.body = "<h1>Test</h1>";
    console.log("working...");
    await next();
})