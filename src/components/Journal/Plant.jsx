import React from 'react';
import { Button, Row, Col} from 'react-bootstrap';

class Plant extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.pid,
      name: props.pname,
      days: props.pdays,
    }
    this.addEvent = this.addEvent.bind(this);
    this.removePlant = this.removePlant.bind(this);
  }

  removePlant(){
    this.props.removePlant(this.state.id, this.state.name);
  }

  addEvent(){
    this.props.addEvent(this.state.id, this.state.name);
  }

  render() {
    return <div className="plant-item">
      <h4>{this.state.name}</h4>
      <div>{this.state.days} days inside</div>
      <div className="plant-commands">
        <Button bsStyle="success" bsSize="xsmall" onClick={this.addEvent}>add event</Button>
        <Button bsStyle="danger" bsSize="xsmall" onClick={this.removePlant}>remove plant</Button>
      </div>
    </div>;
  }

}

export default Plant;
