const app = require("./app");
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const config = process.env;
const PORT = process.env.PORT;

process.on('uncaughtRejection', err => {
    console.log(err.name, err.message)
    console.log('UNCAUGHT REJECTION!')
    process.exit(1);
})

async function connectDB() {

    const database_url = config.DB_URL.replace('<password>', config.DB_PASSWORD);

    try {
        await mongoose.connect(database_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch(e) {
        console.error(e);
    }
}

const server = app.listen(PORT, () => {
    connectDB().catch(console.error);

    console.log(`App run to port ${PORT}`)
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLER REJECTION!')
    server.close(() => {
        process.exit(1);
    })
});