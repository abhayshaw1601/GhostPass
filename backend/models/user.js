const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Use the URI from .env or fallback to local (DB only, no collection path)
const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/passOP';

// 1. Connect using Mongoose
// Do not pass deprecated driver options; mongoose will use appropriate defaults.
mongoose.connect(url)
  .then(() => console.log("MongoDB connected for GhostPass users"))
  .catch(err => console.log("MongoDB connection error:", err));

// 2. Define the Schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // unique prevents duplicate signups
    password: { type: String, required: true },
    age: Number
});

// 3. Export the model
module.exports = mongoose.model("user", userSchema);