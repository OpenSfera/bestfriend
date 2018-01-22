import React from 'react';
import { Grid, Button, Modal, Form, FormGroup, FormControl, Col, Row, ControlLabel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import SferaPlants from '../../api/SferaPlants';
import Plant from './Plant';
import moment from 'moment';
import './plants.css';

function Plants(props) {
  const html = props.data.map( (i,k)=>{
    let t = moment().diff(i.start_date, 'days');
    return <Col md={3} key={i._id}>
      <Plant
        pid={i._id}
        pname={i.name}
        pdays={t}
        removePlant={props.removePlant}
        addEvent={props.addEvent}
        />
    </Col>
  });
  return <Row className="plant-list">{html}</Row>;
}


class PlantsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showModalAdd: false,
      showModalRemove: false,
      showModalAddEvent: false,
      addEventText: '',
      addEventPlantId: null,
      newPlantName: '',
      newPlantDate: new Date()
    }
    this.closeModalAdd = this.closeModalAdd.bind(this);
    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalRemove = this.closeModalRemove.bind(this);
    this.openModalRemove = this.openModalRemove.bind(this);
    this.addPlant = this.addPlant.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateNewPlantDate = this.updateNewPlantDate.bind(this);
    this.updateList = this.updateList.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.removePlant = this.removePlant.bind(this);
    this.removeConfirm = this.removeConfirm.bind(this);
    this.loadNewEvent = props.loadNewEvent;
    this.addEvent = this.addEvent.bind(this);
    this.addEventConfirm = this.addEventConfirm.bind(this);
    this.closeModalAddEvent = this.closeModalAddEvent.bind(this);
    this.updateList();
  }

  addEvent(pid, name){
    this.setState({
      addEventPlantId: pid,
      showModalAddEvent: true
    })
  }

  addEventConfirm(){
    SferaPlants.addEvent('event', this.state.addEventPlantId, this.state.addEventText).then(
      (ok) => {
        this.loadNewEvent();
        this.setState({
          addEventPlantId: null,
          addEventText: '',
          showModalAddEvent: false
        });
      }
    );
  }

  removePlant(pid, name){
    let plant = {
      id: pid,
      name: name
    }
    this.setState({
      showModalRemove: true,
      plantToBeRemoved: plant
    });
  }

  removeConfirm(){
    SferaPlants.remove(this.state.plantToBeRemoved.id).then(
      ()=>{
        this.updateList();
        this.loadNewEvent();
        this.setState({
          showModalRemove: false,
          plantToBeRemoved: null
        });
      }
    );
  }

  updateList(){
    SferaPlants.list().then(
      (items) => {
        this.setState({
          list: items
        })
      }
    );
  }

  closeModalAddEvent() {
    this.setState({ showModalAddEvent: false });
  }

  closeModalAdd() {
    this.setState({ showModalAdd: false });
  }

  openModalAdd() {
    this.setState({ showModalAdd: true });
  }

  closeModalRemove() {
    this.setState({ showModalRemove: false });
  }

  openModalRemove() {
    this.setState({ showModalRemove: true });
  }

  addPlant(e){
    e.preventDefault();
    SferaPlants.add(this.state.newPlantName, this.state.newPlantDate).then(
      (ok)=>{
        this.updateList();
        this.setState({
          showModalAdd: false,
          newPlantName: '',
          newPlantDate: new Date()
        });
        this.loadNewEvent();
      }
    );
  }

  //ready to add new fields on plants
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  updateNewPlantDate(day){
    this.setState({
      newPlantDate: day
    });
  }

  render() {
    return <div>
      <h3>
        Plants &nbsp;&nbsp;
        <Button onClick={this.openModalAdd}><FontAwesome name='plus' /> add</Button>
      </h3>

        <Plants data={this.state.list} addEvent={this.addEvent} removePlant={this.removePlant}/>

      {/* MODAL ADD PLANT */}
      <Modal show={this.state.showModalAdd} onHide={this.closeModalAdd}>
        <Form horizontal onSubmit={this.addPlant}>
          <Modal.Header closeButton>
            <Modal.Title>New Plant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" name="newPlantName" value={this.state.newPlantName} onChange={this.handleInputChange}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalDate">
              <Col componentClass={ControlLabel} sm={2}>
                Date
              </Col>
              <Col sm={10}>
                <DayPickerInput  name="newPlantDate"  value={this.state.newPlantDate} onDayChange={this.updateNewPlantDate}/>
              </Col>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" bsStyle="success" >Save</Button>
            <Button onClick={this.closeModalAdd}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* MODAL REMOVE PLANT */}
      <Modal show={this.state.showModalRemove} onHide={this.closeModalRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Plant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
              this.state.plantToBeRemoved
              ? <div>
                  Are you sure to delete <b>{this.state.plantToBeRemoved.name}</b> from your Sfera?
                </div>
              : null
            }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.removeConfirm}>Remove</Button>
          <Button onClick={this.closeModalRemove}>Undo</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ADD EVENT */}
      <Modal show={this.state.showModalAddEvent} onHide={this.closeModalAddEvent}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <textarea rows="6" className="form-control" name="addEventText" onChange={this.handleInputChange}></textarea>
            <div className="plant-modal-info">(you can write with markdown syntax)</div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.addEventConfirm}>Add</Button>
          <Button onClick={this.closeModalAddEvent}>Undo</Button>
        </Modal.Footer>
      </Modal>
    </div>;
  }
};

export default PlantsList;
