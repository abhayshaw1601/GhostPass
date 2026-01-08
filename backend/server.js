const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Mongoose Models
const userModel = require('./models/user');
const passwordModel = require('./models/password');

dotenv.config();
const app = express();

// Global Constants
const PORT = process.env.PORT || 3000;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "fallback_secret_123";
const JWT_SECRET = process.env.JWT_SECRET || "ghost_token_secret";

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true                
}));
app.use(cookieParser());

// Crash Protection for Malformed JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ error: "Invalid JSON format" });
    }
    next();
});

// Authentication Guard
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Access Denied. Please Login." });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // This contains the user's email
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

// --- ROUTES ---

// GET: Fetch ONLY the logged-in user's passwords
app.get('/', verifyToken, async (req, res) => {
    try {
        const passwords = await passwordModel.find({ userEmail: req.user.email });

        const decryptedData = passwords.map(item => {
            const bytes = CryptoJS.AES.decrypt(item.password, ENCRYPTION_KEY);
            const originalPass = bytes.toString(CryptoJS.enc.Utf8);
            return { ...item._doc, password: originalPass };
        });

        res.json(decryptedData);
    } catch (err) {
        res.status(500).json({ error: "Failed to decrypt data" });
    }
});

// POST: Save a new password (Locked to current user)
app.post('/', verifyToken, async (req, res) => {
    try {
        let { username, password, site, id } = req.body;

        const encryptedPassword = CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();

        const createdPass = await passwordModel.create({
            userEmail: req.user.email, // Automatically use the email from the token
            username,
            password: encryptedPassword,
            site,
            id
        });

        res.status(201).send({ success: true, result: createdPass });
    } catch (err) {
        res.status(500).send({ error: 'Failed to save password' });
    }
});

// DELETE: Remove a password
app.delete('/', verifyToken, async (req, res) => {
    try {
        const deleteResult = await passwordModel.deleteOne({ 
            id: req.body.id, 
            userEmail: req.user.email // Security: Ensure user owns this entry
        });
        res.json({ success: true, result: deleteResult });
    } catch (err) {
        res.status(500).json({ success: false, error: "Delete failed" });
    }
});

// POST: Signup
app.post('/create', async (req, res) => {
    try {
        let { username, email, password, age } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const createdUser = await userModel.create({
            username,
            email,
            password: hash,
            age
        });

        const token = jwt.sign({ email }, JWT_SECRET);
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
        res.status(201).send({ success: true, user: createdUser });
    } catch (err) {
        if (err.code === 11000) return res.status(409).send({ error: 'Email already registered' });
        res.status(500).send({ error: 'Server error during signup' });
    }
});

// POST: Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ email }, JWT_SECRET);

        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
        res.status(200).json({ success: true, message: "Logged in successfully" });
    } catch (e) {
        res.status(500).json({ error: 'Server error during login' });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});

app.listen(PORT, () => {
    console.log(`GhostPass Server running on http://localhost:${PORT}`);
});