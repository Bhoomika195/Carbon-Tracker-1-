const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Entry = require('./models/Entry');

async function listAll() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const entries = await Entry.find().lean();
        console.log(`Total entries: ${entries.length}`);
        entries.forEach(e => {
            console.log(`ID: ${e._id}, UserID: ${e.userId}, Type: ${e.type}, CO2: ${e.co2}, Date: ${e.date}, Tag: ${e.tag}`);
        });
        await mongoose.connection.close();
    } catch (err) {
        console.error('Failed to list:', err);
    }
}

listAll();
