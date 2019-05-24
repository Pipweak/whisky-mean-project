const express = require('express');
const api = require('./api/v1/index');
const cors = require('cors');
const app = express();

/**
 * Port Configuration
 */
app.set('port', (process.env.PORT || 3000));

/**
 * For CORS prevent -> npm install cors
 */
app.use(cors);

/**
 * redirect req /api/v1 to api
 * For ex : /api/v1/ping -> redirect to /ping endpoint.
 */
app.use('/api/v1', api);    // localhost:3000/api/v1

/**
 * Our server listen to 3000 port.
 */
app.listen(app.get('port'), () => {
    console.log(`express server listening on port ${app.get('port')}`);
});

