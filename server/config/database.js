const mongoose = require("mongoose");

require("dotenv").config();

const connectdb = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Successfully Connected");
    })
    .catch((error) => {
        console.log(error);
        console.log("I am having error in this connection")
    })
}

module.exports = connectdb;