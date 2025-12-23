const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('Testing connection with URI:', uri.replace(/:([^:@]+)@/, ':****@'));

mongoose.connect(uri)
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB!');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILURE: Connection failed.');
        console.error('Error Name:', err.name);
        console.error('Error Code:', err.code);
        console.error('Error CodeName:', err.codeName);
        console.error('Message:', err.message);
        process.exit(1);
    });
