//Maint starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
//DB Setup
//mongoose.connect('mongodb://mo1063_auth:qWe123@mongo15.mydevil.net:27017/mo1063_auth');
// mongoose.connect('mongodb://auth.koronawoj.pl:mongo15.mydevil.net/mo1063_auth');
mongoose.connect('mongodb://localhost:app/app');
// mongodb://<dbuser>:<dbpassword>@ds127260.mlab.com:27260/todo
//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);



//Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('server listening on: ', port);
