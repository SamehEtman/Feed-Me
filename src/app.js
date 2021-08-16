const mongoSanitizer = require('express-mongo-sanitize')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const hpp = require('hpp')

const restaurantsRouter = require('./routers/restaurants');
const servingsRouter = require('./routers/servings');
const reviewsRouter = require('./routers/reviews');
const usersRouter = require('./routers/users');
const adminRouter = require('./routers/admin');

const connectDB = require('./dp/mongoose');
const errorHandling = require('./middlewares/errorHandling');

connectDB();

const app = express();
// body parser
app.use(express.json());
app.use(cookieParser());

// define static page 
app.use(express.static(`${__dirname}/../public`))

// logger middleware
app.use(morgan('dev'));


// file uploading
app.use(fileUpload());

// add safety headers
app.use(helmet())

// sanitize data 
app.use(mongoSanitizer())

// prevent XSS
app.use(xss())

//rate limiting 
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
})
app.use(limiter)

// prevent http param pollution
app.use(hpp())

// Enable Cors
app.use(cors())



// mounting routes
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/servings', servingsRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/admin', adminRouter);

// error handling middleware
app.use(errorHandling);

module.exports = app;