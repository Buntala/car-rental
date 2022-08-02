// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const { errorHandler } = require('./utilities/response-handler');
  
const app = express();
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

module.exports = {
    app
}