var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost')

var commands = {
  'process': (cmd) => {
    if ( (typeof commands[cmd]) == 'function') {
      return commands[cmd]();
    } else {
      return false;
    }
  },

  'lights_on': ()=>{
    client.publish('local/technician', 'lights_on');
    return true;
  },

  'lights_off': ()=>{
    client.publish('local/technician', 'lights_off');
    return true;
  }

}

module.exports = commands;
