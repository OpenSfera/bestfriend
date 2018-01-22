import React from 'react';
var Spinner = require('react-spinkit');

class Sensor extends React.Component {

  constructor(props) {
    super(props);
    let um = ''
    switch(props.type){
      case 'temperature':
        um = '*C';
        break;
      case 'humidity':
        um = '%';
    }
    this.state = {
      um: um
    };
  }

  render() {
    const classes = `sensor sensor-${this.props.type}`;
    return <div>
      <div className={classes}>
        <label >{this.props.type}</label>
        <div className="center box-data">
          <div id="temperature-value" className="sensor-value">
            {
              this.props.statusValue !== null
              ? this.props.statusValue+' '+this.state.um
              : <Spinner name='line-scale-pulse-out' />
            }
          </div>
        </div>
      </div>
    </div>;

  }
};

export default Sensor;
