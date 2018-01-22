import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import SensorsPane from '../components/sensors/SensorsPane';
import SferaHealt from '../api/SferaHealt';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="bf-page">
      <Grid>
      <Panel>
        <SensorsPane></SensorsPane>
      </Panel>
      </Grid>
    </div>;

  }
};

export default HomePage;
