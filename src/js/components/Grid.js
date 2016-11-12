const React = require('react');
const ReactDOM = require('react-dom');
const Raphael = require('raphael');

import { connect } from "react-redux"

import WaypointMeta from "./WaypointMeta"

import { clickedPlan, selectWaypoint, selectPath, splitPath } from "../actions/floorplanActions"
import { keypressed } from "../actions/keyboardActions"


@connect((store) => {
  return {
    waypoints: store.waypoint.waypoints,
    last: store.waypoint.lastWaypoint,
    paths: store.path.paths,
    lastPath: store.path.lastPath,
    tools: store.tools
  };
})
export default class Grid extends React.Component{

     constructor () {
        super();

        this.state = {
          paper: null
        };
      }

    floorplanClicked(event) {


        switch(event.target.tagName){
            case "svg":
                return this.props.dispatch(clickedPlan(event));
            case "circle":
                return this.props.dispatch(selectWaypoint(event.target, event.shiftKey));
            case "path":
                if (this.props.tools.selectPathMode){
                    if (event.shiftKey)
                        return this.props.dispatch(splitPath(event.target, event));
                    return this.props.dispatch(selectPath(event.target));
                }
            default:{
                console.log(event.target.tagName);
                break;
            }
        }
    }

    componentDidMount() {;
        this.state.paper = Raphael(this.refs.paper);
    }

    componentWillMount(){
        const that = this;
        document.addEventListener("keyup", function(){
            switch (event.target.tagName.toLowerCase()){
                case "input":
                case "textarea":
                case "select":
                    return true;
            }
            that.props.dispatch(keypressed(event.keyCode));
            return false;
        }, false);
    }

    componentDidUpdate() {

        const paper = this.state.paper;
        const points = this.props.waypoints;
        const paths = this.props.paths;
        const last = this.props.last;
        const lastPath = this.props.lastPath;
        const tools = this.props.tools;

        paper.clear();

        points.forEach(function(p) {
            var circle = paper.circle(p.x, p.y, (p === last) ? 12 : 9);    
            circle.attr("fill", (tools.dropNodes) ? "#f00" : "#000");
            circle.attr("stroke", "#fff");
        });

        paths.forEach(function(p) {
            var path = paper.path( ["M", p.from.x, p.from.y, "L", p.to.x, p.to.y ] );
            if (p == lastPath)
                path.attr("stroke", "#00f");
            if (tools.selectPathMode)
                path.attr({"stroke-width":8});
        })
    }

    render(){
        return <div className="canvas">
                    {this.props.children}
                    <div ref="paper" onClick={this.floorplanClicked.bind(this)}></div>
                    <WaypointMeta point={this.props.last}/>
               </div>
    }
}