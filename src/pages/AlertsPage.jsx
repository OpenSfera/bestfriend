import React from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';
import SferaAlerts from '../api/SferaAlerts';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

function AlertsList(props) {
  const html = props.data.map( (i,k)=>{
    let t = moment(i.time).format('YYYY-MM-DD HH:mm');
    let iconName, iconColor;
    if (i.severity == 'danger'){
      iconName = 'exclamation-triangle';
      iconColor = '#B63E5A';
    } else {
      iconName = 'bell';
      iconColor = '#E9CEAC';
    }
    return <TimelineEvent
      key={k}
      title={i.message_type}
      createdAt={t}
      icon={<FontAwesome name={iconName} size='2x'/>}
      iconColor={iconColor}
      >
      From <b>{i.who}</b> heared <b>{i.heared}</b> expecting <b>{i.expected}</b>
    </TimelineEvent>
  });
  return <Timeline>{html}</Timeline>;
}

class AlertsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alerts: null,
      last: null,
      nomoredata: false
    }
    this.loadMore = this.loadMore.bind(this);
    this.loadMore();
  }

  loadMore(){
    SferaAlerts.fetch(this.state.last).then(
      (alerts)=>{
        if( alerts && alerts.length > 0){
          let last = alerts[alerts.length - 1 ].time;
          let all = this.state.alerts || [];
          all = all.concat(alerts).filter( i => i!==null);
          this.setState({
            alerts: all,
            last:last
          })
        } else {
          this.setState({
            nomoredata: true
          })
        }
      }
    );
  }

  render() {
    return <div className="bf-page">
      <Grid>
      <Panel>
        {
          this.state.alerts
          ? <AlertsList data={this.state.alerts} />
          : <h3 className="text-center">no alerts to show</h3>
        }
        <Row>
          <Col className="text-center">
            <Button bsStyle="primary" onClick={this.loadMore} disabled={this.state.nomoredata}>Load More</Button>
          </Col>
        </Row>
      </Panel>
      </Grid>
    </div>;

  }
};

export default AlertsPage;
