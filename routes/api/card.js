const { readCard, writeCard, cleanup, readCardTask } = require('../../python/rfc');
const { getRouter } = require('./router');

const router = getRouter();

router.get('/cleanup', async(ctx, next) => {
    try {
        await cleanup();
    } catch (err) {
        console.log("CardReader Err:", err);
        ctx.status = 500;
        ctx.body = err;

        return await next();
    }
    ctx.body = {status: 'OK'};
    await next();
})

const getTask = async (ctx, next) => {
    try {
        const res = readCardTask(ctx.params.id, null, ctx.query.timeout);

        ctx.body = res;
    } catch (err) {
        ctx.status = 500;

        console.log(err);

        ctx.body = {
            code: 500,
            error: err
        }
    }

    await next();
}

const postTask = async (ctx, next) => {
    try {
        const res = readCardTask(ctx.params.id, ctx.request.body);

        ctx.body = res;
    } catch (err) {
        ctx.status = 500;

        ctx.body = {
            code: 500,
            error: err
        }
    }

    await next();
}

router.get('/readTask', getTask)

router.get('/readTask/:id', getTask)

router.post('/readTask/:id', postTask)

router.get('/read', async(ctx, next) => {

    

    let res = null;
    try {
        res = await readCard();
    } catch (err) {
        console.log("CardReader Err:", err);
        ctx.status = 500;
        ctx.body = err;

        return await next();
    }


    if(res === null || res.length < 2) {
        ctx.status = 500;

        ctx.body = {code: 500, error: 'App has no access to a rfid reader'}
        return await next();
    }
    

    ctx.body = {id: res[0].trim(), data: res[1].trim()};

    await next();
})

let readObj = {}

router.get('/getRead', async(ctx, next) => {
    ctx.body = readObj;

    await next();
})

router.post('/setRead', async(ctx,next) => {
    let body = ctx.request.body;

    if(body) {
        let diff = false;

        Object.keys(body).forEach(key => {
            if(typeof body[key] === "string") {
                body[key] = body[key].trim();
            }

            if(body[key] !== readObj[key]) {
                diff = true;
            }
        })

        if(diff) {
            readObj = {...readObj, ...body, timer: (new Date()).getTime()}
        
            console.log(readObj);
        }

    }

    await next();
})


router.get('/write', async(ctx, next) => {
    let res = null;

    let dataStr = ctx.query.data;

    try {
        res = await writeCard(dataStr);
    } catch (err) {
        console.log("CardReader Err:", err);
        ctx.status = err.code;
        ctx.body = err;

        return await next();
    }

    let wasWritten = false;

    if(res instanceof Array) {
        res.forEach(item => {
            if(item.trim().toLowerCase() === 'written') {
                wasWritten = true;
            }
        })
    }

    if(res === null || !wasWritten) {
        ctx.status = 500;

        ctx.body = {code: 500, error: 'App has no access to a rfid reader'}
        return await next();
    }

    ctx.body = {status: 'OK'}
    await next();
})