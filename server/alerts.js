var sferadb = require('./sferadb');
var moment = require('moment');

var alerts = {
  'fetch': (from, cb)=> {
    let conn = sferadb.connect();
    return conn.then(
          (db)=>{
            let query = {

            }
            let sort = {
              time: -1
            }
            if( from !== null ){
              let d = moment(from).toDate();
              query['time'] = { '$lt': d };
            }
            return db.collection('alerts')
                        .find(query)
                        .sort(sort)
                        .limit(10)
                        .toArray(function(err, docs) {
                          return cb(err, docs);
                        });
            });
  }
}

module.exports = alerts;
