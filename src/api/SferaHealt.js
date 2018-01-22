const request = require('superagent');

var SferaHealt = {
  'getConfig': () => {
    return request.get('/api/sensors').then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  }
}

export default SferaHealt;
