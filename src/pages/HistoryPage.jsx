import React from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import SferaSamples from '../api/SferaSamples';
import {Line, Scatter} from 'react-chartjs-2';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

const xAxes = {
  title: "time",
  type: 'time',
  bounds: 'ticks',
  time: {
      unit: 'minute',
      stepSize: 120,
      displayFormats: {
          minute: 'HH:mm'
      }
  }
};

const lightsOptions = {
  scales: {
    yAxes: [{
        ticks: {
            max: 1,
            min: 0,
            stepSize: 1
        }
    }],
      xAxes: [xAxes]
  }
}

const tempOptions = {
  scales: {
    yAxes: [{
        ticks: {
            suggestedMin: 10,
            suggestedMax: 30,
            stepSize: 2
        }
    }],
    xAxes: [xAxes]
  }
}

const humOptions = {
  scales: {
    yAxes: [{
        ticks: {
            max: 100,
            min: 0,
            stepSize: 5
        }
    }],
    xAxes: [xAxes]
  }
}


class HistoryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      day: new Date(),
      ldata: null,
      h1data: null,
      t1data: null
    }
    this.selectDay = this.selectDay.bind(this);
    this.updateDatasets = this.updateDatasets.bind(this);
    this.aDayAfter = this.aDayAfter.bind(this);
    this.aDayBefore = this.aDayBefore.bind(this);
    this.updateDatasets(this.state.day);
  }

  aDayAfter(){
    this.selectDay(moment(this.state.day).add(1, 'days').toDate());
  }

  aDayBefore(){
    this.selectDay(moment(this.state.day).add(-1, 'days').toDate());
  }

  selectDay(day){
    this.setState({
      day: day,
      ldata: null,
      h1data: null,
      t1data: null
    })
    this.updateDatasets(day);
  }

  updateDatasets(d){
    SferaSamples.fetch(d).then(
      (result)=>{
        if( result.length > 0 ){
          result = result.map( (i,index)=>{
            i.time = moment.utc(i.time).local();
            return i;
          })

          let lights = result.map( (i)=>{
            return {
              y: (i.lights=='on')?1:0,
              x: i.time
            }
          });
          let t1 = result.map( (i)=>{
            return {
              y: i.t1,
              x: i.time
            }
          });
          let h1 = result.map( (i)=>{
            return {
              y: i.h1,
              x: i.time
            }
          });
          this.setState({
            ldata: {
              datasets: [{
                data: lights,
                pointRadius: 0,
                backgroundColor: '#1AA657',
                borderColor: '#1AA657',
                label: 'Lights',
                fill: true
              }]
            },
            t1data: {
              datasets: [{
                data: t1,
                pointRadius: 0,
                borderColor: '#E94E35',
                backgroundColor: '#E94E35',
                label: 'Temperature',
                fill:false
              }]
            },
            h1data: {
              datasets: [{
                data: h1,
                min: 0,
                max: 100,
                pointRadius: 0,
                borderColor: '#1D6D93',
                backgroundColor: '#1D6D93',
                label: 'Humidity',
                fill:false
              }]
            }
          });
        } else {
          this.setState({
            ldata: null,
            t1data: null,
            h1data: null
          });
        }
      }
    );
  }

  render() {
    return <div className="bf-page">
      <Grid>
        <Panel>
          <div className="text-center">
            <Button  onClick={this.aDayBefore}>
            <FontAwesome name='arrow-circle-left' size='2x'/>
            </Button>&nbsp;
            <DayPickerInput
                value={this.state.day}
                onDayChange={this.selectDay}
                />
            &nbsp;
            <Button onClick={this.aDayAfter}>
            <FontAwesome name='arrow-circle-right' size='2x' />
            </Button>
          </div>
        </Panel>
        <Panel>
          <Row>
            <Col mdOffset={2} md={8}>
              {
                (this.state.ldata)
                ? <Scatter data={this.state.ldata} options={lightsOptions} redraw/>
              : <h3 className="text-center">no data to show</h3>
            }
            </Col>
          </Row>
          <Row>
            <Col mdOffset={2} md={8}>
              {
                (this.state.t1data)
                ? <Scatter data={this.state.t1data} options={tempOptions} redraw/>
              : null
            }
            </Col>
          </Row>
          <Row>
            <Col mdOffset={2} md={8}>
              {
                (this.state.h1data)
                ? <Scatter data={this.state.h1data} options={humOptions} redraw/>
              : null
            }
            </Col>
          </Row>
        </Panel>

      </Grid>
    </div>;

  }
};

export default HistoryPage;
