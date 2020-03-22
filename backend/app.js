//Require all that's needed to power this App
//adding a few documentation
const stream =  require('stream-chat');
const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const RegisterRoute = require('./routes/RegisterRoute');
const AuthRoute = require('./routes/AuthRoute');
const dotenv = require('dotenv');
dotenv.config();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

app.use(express.static("static"));
require('./config/dbconnection');
// allow cors
app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json({limit: '50mb'}));
process.env.TZ = 'Africa/Lagos';
// Authentication Route
app.use('/auth', RegisterRoute, AuthRoute);

app.all('*', (req, res) => {
    res.status(404).send({
      status: 'failed',
      status_code: 404,
      message: 'Resource not found'
    })
  });
  
//Running the server on Port 3000 default
let port = process.env.PORT || 3002;
console.log(process.env.PORT);
app.listen(port, () => {console.log(`App is running on Port ${port}`)});
