const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
    site: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String, required: true }, // For your frontend UUIDs
    userEmail: { type: String } // Crucial for your future login system
});

module.exports = mongoose.model("password", passwordSchema);