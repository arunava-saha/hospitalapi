const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    isDoctor: {
        type: Boolean,
        required: true,
    },
    Report: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }],
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);
