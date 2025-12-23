const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    co2: {
        type: Number,
        required: true,
    },
    tag: {
        type: String,
    },
    note: {
        type: String,
    },
    // Specific fields for different types
    mode: String,
    km: Number,
    kwh: Number,
    vehicle: String,
    flightClass: String,
    longHaul: Boolean,

    // Generic fallback for any other properties
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { strict: false }); // Allow other fields just in case

module.exports = mongoose.model('Entry', entrySchema);
