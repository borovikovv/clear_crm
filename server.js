const app = require("./app");
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const config = process.env;

let db = {};

process.on('uncaughtRejection', err => {
    console.log(err.name, err.message)
    console.log('UNCAUGHT REJECTION!')
    process.exit(1);
})

async function connectDB() {

    const database_url = config.DB_URL.replace('<password>', config.DB_PASSWORD);
    const client = new MongoClient(database_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true });

    try {
        await client.connect();
        db = client.db(config.DB_NAME);

        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const PORT = process.env.PORT || 8060;

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
})

module.exports = db;