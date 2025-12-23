const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Entry = require('./models/Entry');

async function test() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        const dummyUserId = new mongoose.Types.ObjectId();
        const testEntry = {
            userId: dummyUserId,
            date: new Date().toISOString(),
            type: 'test',
            co2: 99.9,
            note: 'Standalone test'
        };

        console.log('Creating entry...');
        const entry = await Entry.create(testEntry);
        console.log('Entry created successfully:', entry._id);

        const found = await Entry.findById(entry._id);
        console.log('Found entry in DB:', found ? 'Yes' : 'No');

        await mongoose.connection.close();
        console.log('Done.');
    } catch (err) {
        console.error('Test failed:', err);
    }
}

test();
