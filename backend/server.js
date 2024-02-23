const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Handling Uncaught Exception e.g., console.log(youtube).
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1);
});

// Config
dotenv.config({path: 'backend/config/config.env'});

// Connecting to database
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection, missing url or incomplete url e.g., 'mongo://127.0.0.1:27017/Ecommerce'
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});