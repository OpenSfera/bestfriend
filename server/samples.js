var sferadb = require('./sferadb');
var moment = require('moment');
var samples = {
  'getDay': (day, cb)=> {
    let conn = sferadb.connect();
    return conn.then(
          (db)=>{
            let d = day.split('-');
            let from = moment(day+'-00:00:00', 'YYYY-MM-DD-HH:mm:ss');
            let to = moment(day+'-23:59:59', 'YYYY-MM-DD-HH:mm:ss');
            return db.collection('samples').aggregate([
              {'$match':
                {
                  time: {
                    '$gte': from.toDate(),
                    '$lte': to.toDate()
                  }
                }
              },
              {'$project': {_id: false, t1:true, h1: true, lights:true, time:true}},
              {'$sort': {time:1}}
            ]).toArray(function(err, docs) {
              return cb(err, docs);
            });
    });
  }
}

module.exports = samples;
