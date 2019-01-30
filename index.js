const Koa = require('koa');
const { getRouter } = require('./routes');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const { loopReader } = require('./python/rfc');

const app = new Koa();
const router = getRouter();

 
loopReader();


app
.use(bodyParser())
.use(serve('public'))
.use(router.routes())
.use(router.allowedMethods())

app.listen(3000);