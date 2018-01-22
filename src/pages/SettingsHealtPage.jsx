import React from 'react';
import { Panel, Grid, Row, Col, ButtonGroup, Button, Modal } from 'react-bootstrap';
import SferaHealt from '../api/SferaHealt';
import HealtControl from '../components/HealtControl';
var Spinner = require('react-spinkit');
import io from 'socket.io-client';
const  socket = io('');

class SettingsHealtPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      healt: null,
      hasChanges: false,
      isLoading: true,
      showModal: false
    }
    SferaHealt.getConfig().then(
      (healt)=>{
        this.setState({
          healt: healt,
          isLoading: false
        })
      }
    );
    this.setParams = this.setParams.bind(this);
    this.persistHealt = this.persistHealt.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  persistHealt(){
    socket.emit('new_healt_config', JSON.stringify(this.state.healt));
    this.setState({
      showModal: true,
      hasChanges: false
    });
  }

  setParams(data){
    this.setState({
      healt: data,
      hasChanges: true
    });
  }

  render() {
    return <div className="bf-page">

      <Row>
        <Col md={10} mdOffset={1}>
          { this.state.isLoading
            ? <Spinner name='line-scale-pulse-out' />
          : <HealtControl healt={this.state.healt} setParams={this.setParams}/>

          }
        </Col>
      </Row>
      <Row style={{"marginTop":"20px"}}>
        <Col md={1} mdOffset={5}>
          <Button bsSize="large" bsStyle="success" disabled={!this.state.hasChanges} onClick={this.persistHealt}>Save</Button>
        </Col>
      </Row>

      <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Configuration Saved
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>;

  }
};

export default SettingsHealtPage;
