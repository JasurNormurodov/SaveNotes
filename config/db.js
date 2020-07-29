const mongoose = require('mongoose');
const {mongoDB} = require('./keys')


mongoose.connect(mongoDB, {
    useNewUrlParser:true,
    useCreateIndex:true
})