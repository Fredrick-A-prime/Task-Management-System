const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const taskRoute = require("./routes/taskRoutes");
const auth = require('./routes/authRoutes')
const { tokenValidation } = require('./middlewares/validationMiddleware')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(tokenRetrieval)
app.use(express());
app.use(express.json());


app.get('*', tokenValidation)
app.use(taskRoute);
app.use(auth);

module.exports = app;
