const request = require('superagent');

var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

var SferaPlants = {
  'list': (showAll) => {
    let query = {}
    if( showAll ){
      query['showAll'] = true;
    }
    return request.get('/api/plants').query(query).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  },

  'listPastEvents': (from) => {
    return request.get('/api/events').query({from: from}).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  },

  'listNewEvents': (to) => {
    return request.get('/api/events').query({to: to}).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  },

  'removeEvents': (eid) => {
    return request.delete('/api/events/'+eid).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  },

  'add': (name, start_date) => {
    return request.post('/api/plants').send({
      name: name,
      start_date: start_date
    }).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  },

  'addEvent': (type, refId, message) => {
    return request.post('/api/events').send({
      type: type,
      refId: refId,
      message: message
    }).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  },

  'remove': (pid) => {
    return request.delete('/api/plants/'+pid).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  }
}

export default SferaPlants;
