const Koa = require('koa');
const { getRouter } = require('./routes');




const app = new Koa();
const router = getRouter();





app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);