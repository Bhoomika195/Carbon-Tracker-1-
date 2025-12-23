const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('Connecting...');

mongoose.connect(uri)
    .then(() => {
        console.log('Connected!');
        console.log('Active Database Name:', mongoose.connection.db.databaseName);
        console.log('Collections in this DB:');
        return mongoose.connection.db.listCollections().toArray();
    })
    .then(collections => {
        console.log(collections.map(c => c.name));
        return mongoose.model('Entry', new mongoose.Schema({}, { strict: false })).countDocuments();
    })
    .then(count => {
        console.log('Number of Entries in this DB:', count);
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
