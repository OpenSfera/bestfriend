var express = require('express');
var api = express.Router();

api.get('/sensors', function(req, res){
  let healt = require('./healt_config.js')
  healt.getCurrentSensors().then(
    (response) => {
      res.status(200).json(response);
    },
    (err) => {
      res.status(500).json({'error': err.toString()});
    }
  );
});

api.get('/samples', function(req, res){
  let samples = require('./samples.js')
  let now = new Date();
  let defaultDay = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
  let day = req.query.day || defaultDay;
  samples.getDay(day, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(200).json(response);
  });
});

api.get('/alerts', function(req, res){
  let samples = require('./alerts.js')
  let from = req.query.from || null;
  samples.fetch(from, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(200).json(response);
  });
});

api.get('/plants', function(req, res){
  let plants = require('./plants.js')
  let showAll = req.query.showAll || null;
  plants.list(showAll, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(201).json(response);
  });
});

api.post('/plants', function(req, res){
  let plants = require('./plants.js')
  plants.add(req.body.name, req.body.start_date, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(201).json(response);
  });
});

api.delete('/plants/:pid', function(req, res){
  let plants = require('./plants.js')
  plants.remove(req.params.pid, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(200).json(response);
  });
});


api.get('/events', function(req, res){
  let plants_events = require('./plants_events.js')
  let from = req.query.from || null;
  let to = req.query.to || null;
  plants_events.list(from, to, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(201).json(response);
  });
});

api.post('/events', function(req, res){
  let plants_events = require('./plants_events.js')
  plants_events.add(req.body.type, req.body.refId, req.body.message, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(201).json(response);
  });
});

api.delete('/events/:eid', function(req, res){
  let plants_events = require('./plants_events.js')
  plants_events.remove(req.params.eid, (err, response)=>{
    if( err ){
      return res.status(500).json({'error': err.toString()});
    }
    return res.status(200).json(response);
  });
});

module.exports = api;
