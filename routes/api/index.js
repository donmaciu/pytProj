const getRouter = require('./router').getRouter;
const router = getRouter();

require('fs').readdirSync(__dirname).forEach(function(file) {
    if(file !== 'router.js') {
        require("./" + file)
    }
});

exports.getRouter = getRouter;