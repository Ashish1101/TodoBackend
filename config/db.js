const mongoose = require('mongoose');
const config = require('config')
const Url = config.get('MONGO_URI');

const mongoDb =  () => {
    mongoose.connect(Url , {
        useNewUrlParser : true,
        useFindAndModify: true,
        useCreateIndex : true,
        useUnifiedTopology : true
    }).then(() => console.log('connected to Database')).catch((err) =>  console.log(err.message))
}

module.exports = mongoDb
