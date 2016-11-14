import React from "react"
import { connect } from "react-redux"

@connect((store) => {
  return {
    last: store.waypoint.lastWaypoint,
    lastPath: store.path.lastPath,
  };
})

import WaypointMeta from './WaypointMeta';

export default class Forms extends React.Component {
  
  handleSubmit = (values) => {
    // Do something with the form values
    console.log(values);
  }

  render() {
  	const tools = this.props.tools;

    return <div class="panel panel-default">
        <WaypointMeta onSubmit={this.handleSubmit} />
    </div>
  }
}
