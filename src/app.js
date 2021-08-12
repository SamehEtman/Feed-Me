const express = require('express');

const app = express();

app.get('/' ,(req ,res , next) =>{
    res.json({
        hello : "hello"
    })
})

module.exports = app;