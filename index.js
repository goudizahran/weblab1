const express = require('express');
const UserRouter = require('./router/UserRouter');
const TripsRouter = require('./router/TripsRouter');

const app = express();

app.use(express.json());

app.use('/user', UserRouter);
app.use('/trips', TripsRouter);

module.exports = app;