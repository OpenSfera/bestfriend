import React from 'react';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
import SferaPlants from '../../api/SferaPlants';
import moment from 'moment';
import './plants.css';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import { Row, Col, Button } from 'react-bootstrap';
import MDReactComponent from 'markdown-react-js';

function getIcon(type){
  let icon, color, title;
  switch( type ){
    case 'add_plant':
      icon = 'leaf';
      color = '#1AA657';
      title = 'Welcome';
      break;
    case 'remove_plant':
      icon = 'pagelines';
      color = '#E94E35';
      title = 'Goodbye';
      break;
    case 'event':
      icon = 'calendar';
      color = '#1D6D93';
      title = 'Event on';
      break;
    default:
      icon = 'calendar-o';
      color = '#0f0';
      title = type;
  }
  return {
    icon: icon,
    color: color,
    title: title
  }
}

function EventList(props) {
  const plants = props.plants;
  const html = props.data.map( (i,k)=>{
    let t = moment(i.cdate).format('YYYY-MM-DD HH:mm');
    let pname = (plants && plants[i.refId])? plants[i.refId].name:'';
    let style = getIcon(i.type);
    let title = <div className="plant-timeline-title">{style.title} <span>{pname}</span></div>;
    let message = i.message || '';
    return <TimelineEvent
      key={k}
      title={title}
      createdAt={t}
      icon={<FontAwesome name={style.icon} size='2x'/>}
      iconColor={style.color}
      >
      <MDReactComponent className="plant-timeline-message" text={message} />

      <Button className="plant-timeline-remove" bsStyle="danger" bsSize="xsmall" onClick={(e)=>{props.remove(i._id)}}>remove this event</Button>
    </TimelineEvent>
  });
  return <Timeline>{html}</Timeline>;
}

class PlantsTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: null,
      plants: null,
      last: null,
      nomoredata: false,
      newEvent: props.triggerNewEvent
    }
    this.loadMore = this.loadMore.bind(this);
    this.remove = this.remove.bind(this);
    this.updatePlantList = this.updatePlantList.bind(this);
    this.mergeEvents = this.mergeEvents.bind(this);
    this.updatePlantList();
    this.loadMore();
  }

  updatePlantList(){
    SferaPlants.list(true).then(
      (items) => {
        let remapped = {};
        items.forEach( (i)=>{
          remapped[i._id] = {
            name: i.name,
            start_date: i.start_date,
            visible: i.visible
          }
        });
        this.setState({
          plants: remapped
        })
      }
    );
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.triggerNewEvent ){
      let e = null;
      if( this.state.events && this.state.events.length > 0 ){
        e = this.state.events[0].cdate;
      }
      SferaPlants.listNewEvents(e).then(
        (events)=>{
          if( events && events.length > 0){
            this.updatePlantList();
            let all = this.mergeEvents(this.state.events, events)
            this.setState({
              events: all
            })
          }
        });
    }
  }

  remove(id){
    SferaPlants.removeEvents(id).then(
      (ok)=>{
        let events = this.state.events.filter( (i)=>{ return (i._id != id) });
        this.setState({
          events: events
        });
      }
    );
  }

  loadMore(){
    SferaPlants.listPastEvents(this.state.last).then(
      (events)=>{
        if( events && events.length > 0){
          let all = this.mergeEvents(this.state.events, events)
          let last = all[all.length - 1 ].cdate;
          this.setState({
            events: all,
            last:last
          })
        } else {
          this.setState({
            nomoredata: true
          })
        }
      });
  }

  mergeEvents(a, b){
    a = a || [];
    return a.concat(b)
            .filter(i => i!==null)
            .sort( (x,y)=> {return x.cdate < y.cdate} )
  }

  render() {
    return <div>
      <h3>
        Timeline
      </h3>
      {
        this.state.events
        ? <EventList
              data={this.state.events}
              remove={this.remove}
              plants={this.state.plants}
          />
      : <h3 className="text-center">no events to show</h3>
      }
      <Row>
        <Col className="text-center">
          <Button bsStyle="primary" onClick={this.loadMore} disabled={this.state.nomoredata}>Load More</Button>
        </Col>
      </Row>
    </div>;
  }
};

export default PlantsTimeline;
