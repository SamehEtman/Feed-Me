const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const restaurantsRouter = require('./routers/restaurants')
const servingRouter = require('./routers/servings')
const userRouter = require('./routers/users')

const connectDB = require('./dp/mongoose');
const errorHandling = require('./middlewares/errorHandling');

connectDB();

const app = express();
app.use(express.json())

// logger middleware
app.use(morgan('dev'))

app.use(cookieParser())
// mounting routes

app.use('/api/v1/restaurants', restaurantsRouter)
app.use('/api/v1/servings', servingRouter)
app.use('/api/v1/users' , userRouter);
// error handling middleware
app.use(errorHandling)

module.exports = app;