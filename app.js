const express = require("express");
const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRoutes");
const cookieParser = require('cookie-parser')
const globalErrorsHandler = require("./controllers/errorController");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use("/api-v1", authRouter);
app.use("/api-v1", usersRouter);
app.use(globalErrorsHandler);


module.exports = app;