const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const errorHandler = require('./middleware/error');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Route Imports
const product = require('./routers/productRouter');
const user = require('./routers/userRouter');

app.use('/api/v1', product);
app.use('/api/v1', user);

// Middleware for Errors
app.use(errorHandler);

module.exports = app;