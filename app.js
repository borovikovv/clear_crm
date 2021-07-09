const express = require("express");
const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRoutes");
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api-v1", authRouter);
app.use("/api-v1", usersRouter);

module.exports = app;