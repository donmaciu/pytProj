const getRouter = require('./router').getRouter;
const router = getRouter();

const apiRouter = require('./api').getRouter();

require('fs').readdirSync(__dirname).forEach(function(file) {
    if(file !== 'router.js') {
        require("./" + file)
    }
});

// SubRoutes
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods()); // Obsługa API


exports.getRouter = getRouter;