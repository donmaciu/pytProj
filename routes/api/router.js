const Router = require('koa-router');

let router = null;

/**
 * @returns {Router}
 */
const getRouter = () => {
    if(router === null) {
        router = new Router();
    }

    return router;
}

module.exports = {
    getRouter: getRouter
}