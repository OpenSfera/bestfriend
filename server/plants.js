var sferadb = require('./sferadb');
var plants_events = require('./plants_events');
var mongodb = require('mongodb');
var moment = require('moment');
var plants = {
  'list': (showAll, cb)=> {
    let conn = sferadb.connect();
    return conn.then(
          (db)=>{
            let query = {};
            if( showAll == null ){
              query['visible'] = true;
            }
            return db.collection('plants').find(query).sort({start_date:-1}).toArray(function(err, docs) {
              return cb(err, docs);
            });
    });
  },

  'add': (name, start_date, cb) => {
    let conn = sferadb.connect();
    return conn.then(
          (db)=>{
            db.collection('plants').insert({
              name: name,
              start_date: start_date,
              visible: true
            }, function(err, res) {
              if( !err ){
                plants_events.add('add_plant', res.insertedIds[0], null, null);
              }
              return cb(err, res);
            });
          });
  },

  'remove': (pid, cb) => {
    let conn = sferadb.connect();
    let mid = new mongodb.ObjectID(pid);
    return conn.then(
          (db)=>{
            db.collection('plants').updateOne(
              { _id: mid },
              { '$set': {'visible':false}},
              function(err, res) {
                if( !err ){
                  plants_events.add('remove_plant', mid, null, null);
                }
                return cb(err, res);
              });
          });
  }
}

module.exports = plants;
