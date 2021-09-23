var express = require('express');

const indexRoute = require('./Routes/index');
const videoStreamRoute = require('./Routes/vidStream');

var app = express();

app.use('/', indexRoute);
app.use('/video', videoStreamRoute);

module.exports = app;