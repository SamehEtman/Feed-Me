const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const restaurantsRouter = require('./routers/restaurants')
const servingsRouter = require('./routers/servings')
const reviewsRouter = require('./routers/reviews')
const usersRouter = require('./routers/users')


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
app.use('/api/v1/servings', servingsRouter)
app.use('/api/v1/reviews', reviewsRouter)
app.use('/api/v1/users' , usersRouter);
// error handling middleware
app.use(errorHandling)

module.exports = app;