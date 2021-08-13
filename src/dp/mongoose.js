const mongoose = require('mongoose');
const chalk = require('chalk')
const connectDB = async () => {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    };

    const DB = await mongoose.connect(process.env.MONGODB_URL, options);
    console.log(chalk.green.bold.underline(`Mongo DB is running on host : `, DB.connection.host));
}

module.exports = connectDB;