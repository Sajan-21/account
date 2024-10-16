const mongoose = require('mongoose');

async function mongoConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("database connection established");
    } catch (error) {
        console.log("error : ",error);
    }
}

module.exports = mongoConnect;