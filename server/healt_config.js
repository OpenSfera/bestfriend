var sferadb = require('./sferadb');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost')

var healt = {
  'getCurrentSensors': ()=> {
    let conn = sferadb.connect();
    return conn.then(
          (db)=>{
            return db.collection('config').findOne({'key': 'sfera_healt'}).then(
              (doc)=>{
                return doc.value.sensors;
              },
              (err) => {
                return err;
              }
            );
          },
          (err)=>{
            return err
          }
        )
    },

    'setNewConfiguration': (conf)=>{
      let message = {
        type: 'healt_update',
        data: conf
      }
      client.publish('local/manager', JSON.stringify(message));
    }
}

module.exports = healt;
