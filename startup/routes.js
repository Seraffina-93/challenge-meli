const express = require('express');
const error = require('../middleware/error');
const traceIP = require('../routes/traceIP');
const stats = require('../routes/stats');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/traceIP', traceIP);
    app.use('/api/stats', stats);
    app.use(error);
}