const request = require('superagent');

var SferaSamples = {
  'fetch': (day) => {
    let d = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
    return request.get('/api/samples').query({day: d}).then(
      (ok)=>{
        return ok.body;
      },
      (err)=>{
        return err
      }
    )
  }
}

export default SferaSamples;
