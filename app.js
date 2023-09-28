const express = require("express");
const bodyParser = require("body-parser");
const taskRoute = require("./routes/taskRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express());
app.use(express.json());

app.use(taskRoute);

module.exports = app;
