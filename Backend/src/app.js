const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const appRouter = require('./routes/index.js');
const cors = require('cors')
const app = express();

require('dotenv').config()

//middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev')); // remove in production

app.use('/api/v1', appRouter)



module.exports = app
