import React from 'react';
import io from 'socket.io-client';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import LikeShell from '../components/LikeShell';
const  socket = io('');

class MqttDebugPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'alert': [],
      'system': [],
      'status': []
    }
  }

  componentDidMount() {
    socket.on('mqtt_debug', ( r )=> {
      let channel = r.topic.replace('local/', '');
      let state = this.state;
      state[channel].push(r.data);
      this.setState(state);
    });

    socket.on('error', (error) => {
      console.log('error', error)
    });
  }

  render() {
    return <div>
      <Grid>
        <Row>
          <Col md={12}><LikeShell id="local/status" content={this.state.status}></LikeShell></Col>
        </Row>
        <Row>
          <Col md={12}><LikeShell id="local/system" content={this.state.system}></LikeShell></Col>
        </Row>
        <Row>
          <Col md={12}><LikeShell id="local/alert" content={this.state.alert}></LikeShell></Col>
        </Row>
      </Grid>
    </div>;

  }
};

export default MqttDebugPage;
