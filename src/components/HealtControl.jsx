import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';
import {  Link } from 'react-router-dom'
import TimeRange from './TimeRange';
import DoubleRange from './DoubleRange';

class HealtControl extends React.Component {

  constructor(props) {
    super(props);
    let ligthsOpen = ( props.healt.lights && props.healt.lights[0] )?true:false;
    let t1Open = ( props.healt.t1 && props.healt.t1 !== '')?true:false;
    let h1Open = ( props.healt.h1 && props.healt.h1 !== '' )?true:false;
    this.state = {
      lights: props.healt.lights || [],
      ligthsOpen: ligthsOpen,
      t1: props.healt.t1 || '',
      t1Open: t1Open,
      h1: props.healt.h1 || '',
      h1Open: h1Open
    };
    this.setParams = this.setParams.bind(this);
    this.updateLights = this.updateLights.bind(this);
    this.updateTemp = this.updateTemp.bind(this);
    this.updateHum = this.updateHum.bind(this);
  }

  setParams(){
    let packet = {};

    if( this.state.lights[0] ){
      packet['lights'] = this.state.lights;
    }
    if( this.state.t1 !== ''){
      packet['t1'] = this.state.t1;
    }
    if( this.state.h1 !== ''){
      packet['h1'] = this.state.h1;
    }
    this.props.setParams(packet);
  }

  updateLights(e){
    this.setState({
      lights: e
    });
    this.setParams();
  }

  updateTemp(e){
    this.setState({
      t1: e
    });
    this.setParams();
  }

  updateHum(e){
    this.setState({
      h1: e
    });
    this.setParams();
  }

  lightsSwitch(elem, state){
      if(state){
        this.setState({
          ligthsOpen: true
        });
      } else {
        this.setState({
          ligthsOpen: false,
          lights: []
        });
      }
  }

  t1Switch(elem, state){
      if(state){
        this.setState({
          t1Open: true
        });
      } else {
        this.setState({
          t1Open: false,
          t1: ''
        });
      }
  }

  h1Switch(elem, state){
      if(state){
        this.setState({
          h1Open: true
        });
      } else {
        this.setState({
          h1Open: false,
          h1: ''
        });
      }
  }

  render() {
    return <div>
      <Panel>
        <h3>Lights</h3>
        <br />
        <b>Manual:</b> you are in charge of turn on/off lights from the switch in <Link to="/home">Home page</Link>.<br /><br />
        <b>Automatic:</b> you select when lights should be on, <i>Sfera</i> will do it for you.<br /><br /><br />
        <Switch
          onText="Automatic"
          offText="Manual"
          onColor="success"
          offColor="warning"
          defaultValue={this.state.ligthsOpen}
          onChange={(el, state) => this.lightsSwitch(el, state)}
          />
        {
          this.state.ligthsOpen
          ? <Panel collapsible expanded={this.state.ligthsOpen}>
              <TimeRange ranges={this.state.lights} updateLights={this.updateLights}></TimeRange>
            </Panel>
          : <div></div>
        }


        <hr />
          <h3>Temperature Alerts</h3>
          <br />
          <b>On:</b>You can decide the WARNING and DANGER zones.<br /><br />
          <b>Off:</b>No alerts<br /><br /><br />
            <Switch
              onText="ON"
              offText="OFF"
              onColor="success"
              offColor="warning"
              defaultValue={this.state.t1Open}
              onChange={(el, state) => this.t1Switch(el, state)}
              />
              {
                this.state.t1Open
                ? <Panel collapsible expanded={this.state.t1Open}>
                    <DoubleRange data={this.state.t1} update={this.updateTemp}/>
                  </Panel>
                : <div></div>
              }
        <hr />

          <h3>Humidity Alerts</h3>
          <br />
          <b>On:</b>You can decide the WARNING and DANGER zones.<br /><br />
          <b>Off:</b>No alerts<br /><br /><br />
            <Switch
              onText="ON"
              offText="OFF"
              onColor="success"
              offColor="warning"
              defaultValue={this.state.h1Open}
              onChange={(el, state) => this.h1Switch(el, state)}
              />
              {
                this.state.h1Open
                ? <Panel collapsible expanded={this.state.h1Open}>
                    <DoubleRange data={this.state.h1} update={this.updateHum}/>
                  </Panel>
                : <div></div>
              }
      </Panel>
    </div>;

  }
};

export default HealtControl;
