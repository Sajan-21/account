const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    otp : {
        type : String
    }
});

module.exports = mongoose.model("users",usersSchema);
