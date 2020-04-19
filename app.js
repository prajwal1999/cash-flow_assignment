/* global require module */
const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const app = express();
const routes = require('./routes');

app.use(bodyParser.json());

// route for authenticating user
app.post("/login", routes.login);

// route for image thumbnail generation
app.get('/compress', middleware.verifyToken, routes.compress);


app.listen(3000);

module.exports = app;