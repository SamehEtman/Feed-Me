const express = require('express');


const restaurantsRouter = require('./routers/restaurants')
const connectDB = require('./dp/mongoose')

connectDB();

const app = express();
app.use(express.json())

// routes
app.use('/api/v1/restaurants' , restaurantsRouter)


module.exports = app;