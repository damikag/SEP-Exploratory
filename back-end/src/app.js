var express = require('express');

const homeRoute = require('./api/routes/home/routes');
const researcherRoute =  require('./api/routes/researcher/routes');

var cors=require('cors');

var app = express();

app.use(cors());

app.use((req,res,next) => {
    res.header("Access-Control-Expose-Headers", "exp-auth-token");
    next();
});

app.use(express.json());

app.use('/',homeRoute);
app.use('/researcher',researcherRoute);

module.exports = app
