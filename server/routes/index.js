const authRouter = require('./authRouter');
const productsRouter = require('./products');
const forgotPass = require('./forgotPass');
const orders = require('./orders');
const comments=require('./comments');
const feedback=require('./feedback');


function router(app) {
    app.use('/auth', authRouter);
    app.use('/comments', comments);
    app.use('/order', orders);
    app.use('/products', productsRouter);
    app.use('/api-nodemail-forgot-password',forgotPass);
    app.use('/feedback',feedback);
}

module.exports = router;
