const express = require("express");
const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRoutes");
const cookieParser = require('cookie-parser')
const ErrorMiddleware = require("./middleware/ErrorMiddleware");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api-v1", authRouter);
app.use("/api-v1", usersRouter);
app.use(ErrorMiddleware);



module.exports = app;