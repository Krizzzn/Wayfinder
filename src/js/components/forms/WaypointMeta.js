import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import WaypointLinks from './WaypointLink';

const { DOM: { input } } = React

class WaypointMetaForm extends Component {
  render() {
    const { handleSubmit, deleteButtonClicked, typeValue, isConfigurable, isPortal, links, pristine, submitting } = this.props;

    return (
        <form onSubmit={handleSubmit}>
          <h4 class="text-uppercase">Node{(typeValue) && ": " + typeValue}</h4>
          {isConfigurable && <div class="form-group">
            <label htmlFor="roomName">Room Name</label>
            <Field name="roomName" component="input" type="text" className="form-control"/>
          </div>}
          <div class="form-group">
            <label htmlFor="type">Waypoint Type</label>
            <Field name="type" component="select" className="form-control">
              <option value="">-- default --</option>
              <option value="Stair">Stairs</option>
              <option value="Elevator">Elevator</option>
              <option value="Room">Room</option>
              <option value="Desk">Desk</option>
            </Field>
          </div>

          {isPortal && <Field name="links" component={WaypointLinks} links={links}/>}

          <button type="submit" class="btn btn-primary" disabled={pristine || submitting}>Submit</button>
        </form>
    );
  }
}

// Decorate the form component
WaypointMetaForm = reduxForm({
  form: 'waypointMeta', // a unique name for this form
  enableReinitialize: true
})(WaypointMetaForm);

// Decorate with connect to read form values
const selector = formValueSelector('waypointMeta') // <-- same as form name
WaypointMetaForm = connect(
  state => {

    const typeValue = selector(state, 'type');

    const isConfigurable = (!!typeValue); 
    const isPortal = ["Stair", "Elevator"].includes(typeValue);
  
    return {
      typeValue,
      isConfigurable,
      isPortal
    }
  }
)(WaypointMetaForm)

export default WaypointMetaForm;