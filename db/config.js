const MongoClient = require('mongodb').MongoClient;

const MongoURL = 'mongodb://127.0.0.1:27017/';


// LiveMongo = "mongodb+srv://@cluster0.f8vmc.mongodb.net/?retryWrites=true&w=majority"

// to support older version of db
const client = new MongoClient(MongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

module.exports = client;