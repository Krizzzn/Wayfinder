import React from "react"
import { connect } from "react-redux"

import { changeFloorplan, clickedPlan } from "../actions/floorplanActions"

@connect((store) => {
  return {
    file: store.floorplan.floorplan,
    floors: store.floorplan.floors
  };
})
export default class Floorplan extends React.Component {
  componentWillMount() {
    var file = this.props.floors[0].file;
    this.changeFloorplan.bind({me: this, file: file});
  }

  changeFloorplan() {
    this.me.props.dispatch(changeFloorplan(this.file))
  }

  render() {

    const file = "assets/floorplans/"+this.props.file;

    return <div><img src={file} style={{width: '100%'}}/></div>
  }
}
