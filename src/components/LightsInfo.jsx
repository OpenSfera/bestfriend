import React from 'react';
import Switch from 'react-bootstrap-switch';
import SferaHealt from '../api/SferaHealt';
import moment from 'moment';
require('./lightsinfo.css');
function LightsInfoTimes(props) {
  const html = props.data.map( (i,k)=>{
    return <li key={k}>{i}</li>
  });
  return <ul>{html}</ul>;
}
class LightsInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      daylight: null,
      night: null,
      times: null
    };
    SferaHealt.getConfig().then(
      (healt)=>{
        if( healt.lights ){
          let times = [];
          let daylight = moment('00:00', 'HH:mm');
          healt.lights.forEach( (t)=>{
            times.push(t);
            let item = t.split('-');
            let hours = moment(item[1], 'HH:mm').diff(moment(item[0],'HH:mm'));
            daylight.add(hours);
          });
          let night_hour = ('0'+(24 - parseInt(daylight.format("HH")))).slice(-2);
          let night_minute = ('0'+((60 - parseInt(daylight.format("mm")))%60)).slice(-2)
          this.setState({
            daylight: daylight.format('HH:mm'),
            night: night_hour+':'+night_minute,
            times: times
          })
        }
      })
  }

  render() {
    return <div>
      {
        this.state.times
        ? <div className="lights-info">
          <p>Scheduled light times:</p>
          <LightsInfoTimes data={this.state.times} />
          <p>Total day time: {this.state.daylight}</p>
          <p>Total night time: {this.state.night}</p>
        </div>
        : null
      }
    </div>;

  }
};

export default LightsInfo;
