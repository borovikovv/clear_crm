const express = require("express");
const authRouter = require("./controllers/routes/authRoutes");

const app = express();
app.use(express.json());

app.use('api/v1', authRouter);

module.exports = app;