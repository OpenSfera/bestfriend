import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import PlantsList from '../components/Journal/PlantsList';
import PlantsTimeline from '../components/Journal/PlantsTimeline';

class JournalPage extends React.Component {

  constructor(props) {
    super(props);
    this.loadNewEvent = this.loadNewEvent.bind(this);
    this.state = {
      triggerNewEvent:false
    }
  }

  loadNewEvent(){
    this.setState({
      triggerNewEvent: true
    });
  }

  render() {
    return <div className="bf-page">
      <Grid>
      <Panel>
        <PlantsList loadNewEvent={this.loadNewEvent}/>
      </Panel>
      <Panel>
        <PlantsTimeline triggerNewEvent={this.state.triggerNewEvent}/>
      </Panel>
      </Grid>
    </div>;

  }
};

export default JournalPage;
