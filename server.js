const app = require("./app");

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`App run to port ${PORT}`)
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLER REJECTION!')
    server.close(() => {
        process.exit(1);
    })
})



