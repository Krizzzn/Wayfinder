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

    return <div class="topFloatForm">
      			<button type="button" className={'btn btn-default ' + snapActive} onClick={this.toggleTools.bind({me: this, tool: 'snap'})}>Snap to grid (<kbd>x</kbd> or <kbd>z</kbd>)</button>
            &nbsp;
      			<button type="button" className={'btn btn-default ' + dropNodes} onClick={this.toggleTools.bind({me: this, tool: 'dropNodes'})}>Place nodes (<kbd>y</kbd>)</button> 
            &nbsp;
      			<button type="button" className={'btn btn-default ' + selectPathMode} onClick={this.toggleTools.bind({me: this, tool: 'selectPathMode'})}>Paths Mode (<kbd>s</kbd>)</button>
			</div>
  }
}
