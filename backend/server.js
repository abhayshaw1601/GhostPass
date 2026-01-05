const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors'); // Add this for React later

dotenv.config();
const app = express();

// --- CRUCIAL: Add this line to read JSON from Postman ---
app.use(express.json());
app.use(cors()); // Allows your React app to talk to this server

const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passOP';

async function main() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passwords');

    // GET all passwords
    app.get('/', async (req, res) => {
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    });

    // POST a new password
    app.post('/', async (req, res) => {
        const password = req.body;
        const insertResult = await collection.insertOne(password);
        res.send({ success: true, result: insertResult });
    });

    // DELETE a password
    app.delete('/', async (req, res) => {
        const password = req.body; // Postman will send { "id": "..." }
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        // Delete based on the unique id
        const deleteResult = await collection.deleteOne({ id: password.id });

        res.send({ success: true, result: deleteResult }); //
    });

    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
}

main();