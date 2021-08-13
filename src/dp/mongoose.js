const mongoose = require('mongoose');
const chalk = require('chalk')
const connectDB = async () => {
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify : true,
    };

    const DB = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true
    });
    console.log(chalk.green.bold.underline(`Mongo DB is running on host : `, DB.connection.host));
}

module.exports = connectDB;