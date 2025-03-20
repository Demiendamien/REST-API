const Schema = require('mongoose').Schema;

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: { 
        type: Number,
        required: true  
    },
});