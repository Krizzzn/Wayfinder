import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

const { DOM: { input } } = React

class WaypointMetaForm extends Component {
  render() {
    const { handleSubmit, deleteButtonClicked, typeValue, isConfigurable, pristine, submitting } = this.props;

    return (
      <div class="rightFloatForm">
        <form onSubmit={handleSubmit}>
          <h4 class="text-uppercase">Node{(typeValue) && ": " + typeValue}</h4>
          {isConfigurable && <div class="form-group">
            <label htmlFor="roomName">Room Name</label>
            <Field name="roomName" bl="232" component="input" type="text" className="form-control"/>
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
          <button type="submit" class="btn btn-default" disabled={pristine || submitting}>Submit</button>
        </form>
      </div>
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
  
    return {
      typeValue,
      isConfigurable
    }
  }
)(WaypointMetaForm)

export default WaypointMetaForm;