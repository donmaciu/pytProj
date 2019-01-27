const { readCard, writeCard, cleanup } = require('../../python/rfc');
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