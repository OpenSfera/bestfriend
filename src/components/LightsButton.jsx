import React from 'react';
import Switch from 'react-bootstrap-switch';
require('../../node_modules/react-bootstrap-switch/dist/css/bootstrap2/react-bootstrap-switch.min.css');
import io from 'socket.io-client';
const  socket = io('');

class LightsButton extends React.Component {

  constructor(props) {
    super(props);
    let value = (props.status=='on')? true : false;
    this.state = {
      status: props.status,
      value: value
    }
  }

  componentWillReceiveProps(nextProps){
    let value = (nextProps.status=='on')? true : false;
    this.setState({status: nextProps.status, value: value});
  }

  handleSwitch(elem, state) {
    let cmd = (state)?'on':'off';
    socket.emit('client_command', 'lights_'+cmd);
    this.setState({value: state});
  }

  render() {
    return <div>
      <Switch
        onChange={(el, state) => this.handleSwitch(el, state)}
        name='test'
        value={this.state.value}
        disabled={ this.state.status ? false:true }
        offColor="danger" />
    </div>;

  }
};

export default LightsButton;
