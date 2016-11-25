import React from "react"
import { connect } from "react-redux"

import { toggleTool } from "../actions/toolsActions";
import { changeFloorplan } from "../actions/floorplanActions";
import { postDataToApi } from "../actions/apiActions";

@connect((store) => {
  return {
    tools:     store.tools,
    floorplan: store.floorplan,
    waypoints: store.waypoint.waypoints,
    paths:     store.waypoint.paths
  };
})

export default class Layout extends React.Component {
  
  toggleTools(){
    this.me.props.dispatch(toggleTool(this.tool))
  }

  toggleFloorPlan(event){
    this.props.dispatch(changeFloorplan(event.target.value));
  }

  save(){
    this.props.dispatch(postDataToApi(this.props.waypoints, this.props.paths));
  }

  render() {
  	
    const tools = this.props.tools;
    const floors = this.props.floorplan.floors;

  	const snapActive = tools.snap ? 'active btn-primary' : ''
  	const dropNodes = tools.dropNodes ? 'active btn-primary' : ''
  	const selectPathMode = tools.selectPathMode ? 'active btn-primary' : ''

    const handleFloorplan = this.toggleFloorPlan.bind(this);
    const floorOptions = floors.map(f => <option key={f.file} value={f.file}>{f.name}</option>)

    return <div class="topFloatForm form-inline">
      			<button type="button" className={'btn btn-default ' + snapActive} onClick={this.toggleTools.bind({me: this, tool: 'snap'})}>Snap to grid (<kbd>x</kbd> or <kbd>z</kbd>)</button>
            &nbsp;
      			<button type="button" className={'btn btn-default ' + dropNodes} onClick={this.toggleTools.bind({me: this, tool: 'dropNodes'})}>Place nodes (<kbd>y</kbd>)</button> 
            &nbsp;
      			<button type="button" className={'btn btn-default ' + selectPathMode} onClick={this.toggleTools.bind({me: this, tool: 'selectPathMode'})}>Paths Mode (<kbd>s</kbd>)</button>
            &nbsp;
            |
            &nbsp;
            <select class="form-control" onChange={this.toggleFloorPlan.bind(this)}>{floorOptions}</select>
            &nbsp;
            |
            &nbsp;
            <button type="button" className={'btn btn-primary'} onClick={this.save.bind(this)}>save data</button>
			</div>
  }
}
