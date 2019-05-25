const express = require('express');
const api = require('./api/v1/index');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const connection = mongoose.connection;

const bp = require('body-parser');

/**
 * Port Configuration.
 */
app.set('port', (process.env.port || 3000));

/**
 * For CORS prevent -> npm install cors.
 * `use()` is a `middleware`, which means that every request
 * will trigger all the middlewares `BEFORE` to reach the endpoint.
 */
app.use(cors());

/**
 * `Custom middleware` which log when request arrived.
 * /!\ dont forget the next() to continue to other middlewares.
 */
app.use((req, res, next) => {
    console.log(`> Request handled by the server at ${new Date()}`);
    next();
});

/**
 * `Body-parser` Middleware to parse POST request body. 
 */
app.use(bp.json());
app.use(bp.urlencoded({
    extended: false
}));

/**
 * Middleware which insert a `prefix` to the req url.
 * For ex : `/api/v1`/ping.
 */
app.use('/api/v1', api); // localhost:3000/api/v1

/**
 * Custom middleware `404`.
 */
app.use((req, res) => {
    const err = new Error('404 not found');
    err.status = 404;
    res.json({
        msg: '404 not found',
        err: err
    });
    // l'appel a `next()` n'est pas necessaire ici, dernier middleware.
});

/**
 * Initialize `Mongodb` connection.
 */
mongoose.connect('mongodb://localhost:27017/whisky-mean', {
    useNewUrlParser: true
});

/**
 * Event on `Mongodb` connection `Errors`.
 */
connection.on('error', (err) => {
    console.error(`> Connection to mongodb failed ${err.message}`);
});

/**
 * Event once `Mongodb` connection `Success`.
 * If success, listen to port.
 */
connection.once('open', () => {
    console.log('> Connection to mongodb success !');

    /**
     * Our server listen to 3000 port.
     */
    app.listen(app.get('port'), () => {
        console.log(`> express server listening on port ${app.get('port')}`);
    });

});