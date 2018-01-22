var MongoClient = require('mongodb').MongoClient;

var sferadb = {
  'connect': ()=>{
    return MongoClient.connect('mongodb://localhost:27017/sfera');
  },
}

module.exports = sferadb;
