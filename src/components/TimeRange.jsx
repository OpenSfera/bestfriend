import React from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';


class TimeRangeItem extends React.Component {
  constructor(props){
    super(props);
    let times = props.value.split('-');
    this.state = {
      from: times[0],
      to: times[1],
      id: props.id
    }
    this.removeTime = this.removeTime.bind(this);
  }

  removeTime(){
    this.props.onRemove(this.state.id)
  }

  render(){

    return <Row>
      <Col md={3}>{this.state.from}</Col>
      <Col md={3}>{this.state.to}</Col>
      <Col md={3}><Button onClick={this.removeTime}>Remove</Button></Col>
    </Row>;
  }
}

class TimeRangeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranges: props.ranges || []
    }
    this.removeTime = this.removeTime.bind(this);
  }

  componentWillReceiveProps(nextProps){
    let next = nextProps.ranges;
    this.setState({ranges: next})
  }

  removeTime(x){
    let currentRanges = this.state.ranges;
    delete currentRanges[x];
    this.setState({
      ranges: currentRanges
    });
    this.props.onLights(currentRanges);
  }

  render(){
    return <Grid>
      <Row>
        <Col md={3}><b>From</b></Col>
        <Col md={3}><b>To</b></Col>
        <Col md={3}></Col>
      </Row>
      {this.state.ranges.map( (r,i)=><TimeRangeItem key={i.toString()} id={i} value={r} onRemove={this.removeTime}/>)}
      <Row>
        <Col md={9}><hr></hr></Col>
      </Row>
    </Grid>;
  }
}

class TimeRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ranges: props.ranges || [],
      from: null,
      to: null,
      dateError: false
    }
    this.setFrom = this.setFrom.bind(this);
    this.setTo = this.setTo.bind(this);
    this.addRange = this.addRange.bind(this);
    this.updateParent = this.updateParent.bind(this);
  }

  addRange(){
    if(moment(this.state.from).isBefore(this.state.to)){
      let r = this.state.from.format('HH:mm') + '-' + this.state.to.format('HH:mm');
      let nr = this.state.ranges;
      nr.push(r);
      this.setState({
        ranges: nr,
        dateError: false
      })
      this.updateParent(this.state.ranges);
    } else {
      this.setState({
        dateError: true
      })
    }
  }

  updateParent(newLights){
    this.props.updateLights(newLights.filter( (i) => {return i }));
  }

  setFrom(v){
    this.setState({
      from: v
    })
  }

  setTo(v){
    this.setState({
      to: v
    });
  }

  render(){
    return <div>
      {
        (this.state.ranges.length)
        ? <TimeRangeList ranges={this.state.ranges} onLights={this.updateParent}/>
        : null
      }
      <Grid>
        <Row>
          <Col md={3}>From: <TimePicker showSecond={false} onChange={this.setFrom}/></Col>
          <Col md={3}>To: <TimePicker showSecond={false} onChange={this.setTo}/></Col>
          <Col md={3}><Button onClick={this.addRange}>Add</Button></Col>
          { this.state.dateError
            ? <Col md={3}>Range wrong!</Col>
            : null
          }
        </Row>
      </Grid>

    </div>;
  }
};

export default TimeRange;
