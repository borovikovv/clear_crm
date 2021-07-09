const express = require("express");
const authRouter = require("./routes/authRoutes");
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('api/v1', authRouter);

module.exports = app;