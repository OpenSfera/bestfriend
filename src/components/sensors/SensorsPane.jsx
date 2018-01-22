import React from 'react';
import io from 'socket.io-client';
import Sensor from './Sensor'
import { Grid, Row, Col } from 'react-bootstrap';
require('./sensors.css')
const  socket = io('');
import SferaHealt from '../../api/SferaHealt';
import LightsButton from '../LightsButton';
import LightsInfo from '../LightsInfo';

class SensorsPane extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lights: null,
      t1: null,
      h1: null,
      lights_command: false
    };
    SferaHealt.getConfig().then(
      (healt)=>{
        this.setState({
          lights_command: healt.lights || false
        })
      }
    );
    // socket.on('message', m => this.setState({message: message+m}));
  }

  componentDidMount() {
    socket.on('sfera_status', ( r )=> {
      // let msg = JSON.parse(r);
      // let x = msg.data;
      this.setState({
        lights: r.lights,
        t1: r.t1,
        h1: r.h1
      })
    });

    socket.on('error', (error) => {
      console.log('error', error)
    });
  }

  render() {
    return <div className="sensors-pane">
      <h1>dashboard</h1>
        <Row className="show-grid">
          <Col md={4}>
            <Sensor type="lights" statusValue={this.state.lights}></Sensor>
            <div className="sensor-commands">
            {
              this.state.lights_command
              ? <LightsInfo />
              : <LightsButton status={this.state.lights} />
            }
            </div>
          </Col>
          <Col md={4}>
            <Sensor type="temperature" statusValue={this.state.t1}></Sensor>

          </Col>
          <Col md={4}>
            <Sensor type="humidity" statusValue={this.state.h1}></Sensor>

          </Col>
        </Row>
    </div>;

  }
};

export default SensorsPane;
