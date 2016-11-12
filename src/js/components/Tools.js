import React from "react"
import { connect } from "react-redux"

import { toggleTool } from "../actions/toolsActions";

@connect((store) => {
  return {
    tools: store.tools
  };
})

export default class Layout extends React.Component {
  
  toggleTools(){
    this.me.props.dispatch(toggleTool(this.tool))
  }

  render() {
  	const tools = this.props.tools;

  	const snapActive = tools.snap ? 'active btn-primary' : ''
  	const dropNodes = tools.dropNodes ? 'active btn-primary' : ''
  	const selectPathMode = tools.selectPathMode ? 'active btn-primary' : ''

    return <div class="panel panel-default">
      		<div class="panel-body">
      			<button type="button" className={'btn btn-default ' + snapActive} onClick={this.toggleTools.bind({me: this, tool: 'snap'})}>Snap to grid</button>
      			<button type="button" className={'btn btn-default ' + dropNodes} onClick={this.toggleTools.bind({me: this, tool: 'dropNodes'})}>Place nodes</button>
      			<button type="button" className={'btn btn-default ' + selectPathMode} onClick={this.toggleTools.bind({me: this, tool: 'selectPathMode'})}>Split Paths Mode</button>
			</div>
    </div>
  }
}
