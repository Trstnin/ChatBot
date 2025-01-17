const express = require('express')
const app = express();

require('dotenv').config()


app.get('/' ,(req,res)=>{
    res.send('working')
})

module.exports = app
