const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.dbURL)
    .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDB;