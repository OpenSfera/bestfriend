var sferadb = require('./sferadb');
var mongodb = require('mongodb');
var moment = require('moment');

var plants_events = {
  'list': (from, to, cb)=> {
    let conn = sferadb.connect();
    return conn.then(
          (db)=>{
            let query = {

            };
            if( from !== null ){
              let df = moment(from).toDate();
              query['cdate'] = { '$lt': df };
            }
            if( to !== null ){
              let dt = moment(to).toDate();
              query['cdate'] = { '$gt': dt };
            }
            return db.collection('plants_event').find(query).sort({cdate:-1}).toArray(function(err, docs) {
              return cb(err, docs);
            });
    });
  },

  'remove': (eid, cb) => {
    let conn = sferadb.connect();
    let mid = new mongodb.ObjectID(eid);
    return conn.then(
          (db)=>{
            db.collection('plants_event').remove({ _id: mid },
              function(err, res) {
                return cb(err, res);
              });
          });
  },

  'add': (type, refId, message, cb)=>{
    let conn = sferadb.connect();
    if( typeof refId === 'string'){
      refId = new mongodb.ObjectID(refId);
    }
    return conn.then(
          (db)=>{
            db.collection('plants_event').insert({
              cdate: new Date(),
              type: type,
              refId: refId,
              message: message
            }, function(err, res) {
              if( typeof cb == 'function'){
                return cb(err, res);
              }
            });
          });
  }
}

module.exports = plants_events;
