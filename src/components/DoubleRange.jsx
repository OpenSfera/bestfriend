import React from 'react';
import { Panel, Grid, Row, Col, Button, FormControl } from 'react-bootstrap';

class FourRange extends React.Component {
  constructor(props) {
    super(props);
    let dd, dw, uw, ud;

    let values = [8, 12, 35, 40];
    if( props.data !== ''){
      values = props.data.split('|').map((x,y)=>{ return x})
    }
    this.state = { values: values }
    this.updateParent = this.updateParent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateParent(){
    let data = this.state.values.join('|');
    this.props.update(data);
  }

  handleChange(e){
    let value = parseInt(e.target.value);
    let name = e.target.name;
    let values = this.state.values;
    values[name] = value;
    this.setState(values);
    this.updateParent();
  }

  render(){

    const rows = [ "Danger Min", "Warning Min", "Warning Max",  "Danger Max"];
    return <Grid>
      { rows.map((row, i)=>{
        return <Row key={i}>
          <Col md={2}>
            {row}
          </Col>
          <Col md={8}>
            <input
              type="range"
              name={i}
              step={1}
              value={ parseInt(this.state.values[i]) }
              min={ (this.state.values[i-1])?parseInt(this.state.values[i-1])+1:0 }
              max={ (this.state.values[i+1])?parseInt(this.state.values[i+1])-1:100 }
              onChange={this.handleChange}
              />
          </Col>
          <Col md={2}>
            {this.state.values[i]}
          </Col>
        </Row>
      })}

      </Grid>;
  }
};

export default FourRange;
