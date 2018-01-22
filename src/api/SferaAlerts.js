const request = require('superagent');

var SferaAlerts = {
  'fetch': (from) => {
    return request.get('/api/alerts').query({from: from}).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  }
}

export default SferaAlerts;
