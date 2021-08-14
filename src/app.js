const express = require('express');
const morgan = require('morgan')

const restaurantsRouter = require('./routers/restaurants')
const servingRouter = require('./routers/servings')


const connectDB = require('./dp/mongoose');
const errorHandling = require('./middlewares/errorHandling');

connectDB();

const app = express();
app.use(express.json())

// logger middleware
app.use(morgan('dev'))

// mounting routes

app.use('/api/v1/restaurants', restaurantsRouter)
app.use('/api/v1/servings', servingRouter)

// error handling middleware
app.use(errorHandling)

module.exports = app;