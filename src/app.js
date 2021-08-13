const express = require('express');


const restaurantsRouter = require('./routers/restaurants')
const servingRouter = require('./routers/servings')


const connectDB = require('./dp/mongoose');
const  errorHandling  = require('./middlewares/errorHandling');

connectDB();

const app = express();
app.use(express.json())

// routes
app.use('/api/v1/restaurants' , restaurantsRouter)
app.use('/api/v1/servings' , servingRouter)

// error handling 
app.use(errorHandling)

module.exports = app;