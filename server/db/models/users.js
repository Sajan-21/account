const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    }
});

module.exports = mongoose.model("users",usersSchema);
