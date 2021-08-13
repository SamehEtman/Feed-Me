const app = require('./app');
const chalk = require('chalk')

const port = process.env.PORT;

app.listen(port , ()=>{
    console.log(chalk.green.bold.inverse(`Server is running on port : ` , port));
})