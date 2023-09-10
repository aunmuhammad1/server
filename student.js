const mongoose = require('mongoose');

const Studentschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    year: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Student', Studentschema);

