var express = require('express');

const homeRoute = require('./api/routes/home/routes');
const registerRoute = require('./api/routes/register/routes')
var cors=require('cors');

var app = express();

app.use(cors());

app.use((req,res,next) => {
    res.header("Access-Control-Expose-Headers", "erp-auth-token");
    next();
});

app.use(express.json());

app.use('/',homeRoute);
app.use('/register',registerRoute);

module.exports = app
