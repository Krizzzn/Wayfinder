import React from "react"
import { connect } from "react-redux"

import WaypointMeta from './forms/WaypointMeta';

@connect((store) => {
  return {
    last: store.waypoint.lastWaypoint,
    links: store.waypoint.links,
    lastPath: store.path.lastPath,
  };
})
export default class Form extends React.Component {
  
  handleSubmit = (values) => {
    if (this.props.last){
      this.props.dispatch({
        type: "UPDATE_WAYPOINT",
        payload: values
      })
    }
  }

  retract = () => {
      this.props.dispatch({
        type: "RETRACT",
      })
      return null
  }

  render() {

    const point = this.props.last
    const links = this.props.links

    var form = "";
    if (point){
      form = <WaypointMeta onSubmit={this.handleSubmit} deleteButtonClicked={this.retract} initialValues={point} links={links}/>
    }
    
    if (!form)
      return null;

    return <div class="rightFloatForm">
      {form}
    </div>
  }
}
