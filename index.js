var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost')
var api = require('./server/');

client.on('connect', function () {
  client.subscribe('local/status');
  client.subscribe('local/alert');
  client.subscribe('local/system');
})

client.on('message', function (topic, message) {
  if( topic === 'local/status'){
    let data = JSON.parse(message.toString());
    if( data.event === 'sfera_status' ){
      io.emit(data.event, data.data);
    }
  }

  io.emit('mqtt_debug', { topic: topic, data:message.toString()})
})

app.use(express.static('web'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
  res.sendFile(__dirname + '/web/index.html');
});

app.use('/api', api);

io.on('connection', function(socket){
  // console.log('a user connected');
  socket.on('disconnect', function(){
    // console.log('user disconnected');
  });
  socket.on('client_command', function(msg){
    let commands = require('./server/commands.js')
    commands.process(msg.toString());
  });
  socket.on('new_healt_config', function(msg){
    let healt = require('./server/healt_config.js')
    healt.setNewConfiguration(JSON.parse(msg));
    // let commands = require('./server/commands.js')
    // commands.process(msg.toString());
  });
});

let port = 3000
http.listen(port, function(){
  console.log('listening on *:%s', port);
});
