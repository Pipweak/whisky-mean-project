const express = require('express');
const router = express.Router();

/**
 * Route for endPoint : /ping
 * locahost:3000/ping
 */
router.get('/ping', (req, res) => {
    res.status(200).json({
        msg: 'pong',
        data: new Date()
    });
});

module.exports = router;