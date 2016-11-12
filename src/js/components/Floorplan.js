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

    const buttons = this.props.floors.map((m,i) => <button type="button" key={'floors_'+i} class="btn btn-default" onClick={this.changeFloorplan.bind({me: this, file: m.file})}>{m.name}</button> )

    return <div class="col-md-12">
      <div class="col-md-8">
        <img src={file} style={{width: '100%'}}/>
      </div>
      <div class="col-md-4">
        <div class="btn-group" role="group">
          {buttons}  
        </div>
      </div>
    </div>
  }
}
