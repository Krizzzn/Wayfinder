const React = require('react');
const ReactDOM = require('react-dom');
const Raphael = require('raphael');

import { connect } from "react-redux"

import { clickedPlan, selectWaypoint, selectPath, splitPath } from "../actions/floorplanActions"
import { registerKeyboardHandler } from "../actions/keyboardActions"


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

    getSelectedRaphaelObject(event, type){
        const raphaelObject = this.state.paper.getById(event.target.raphaelid);
        const floorplanObject = raphaelObject.data(type);
        return {...floorplanObject};
    }

    floorplanClicked(event) {

        switch(event.target.tagName){
            case "svg":
                return this.props.dispatch(clickedPlan(event));
            case "circle":
                const wp = this.getSelectedRaphaelObject(event, 'waypoint');
                return this.props.dispatch(selectWaypoint(wp, event.shiftKey));
            case "path":
                if (this.props.tools.selectPathMode){
                    const path = this.getSelectedRaphaelObject(event, 'path');

                    if (event.shiftKey)
                        return this.props.dispatch(splitPath(path, event));
                    return this.props.dispatch(selectPath(path));
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

      registerKeyboardHandler(document, this);
    }

    componentDidUpdate() {

        const paper = this.state.paper;
        const points = this.props.waypoints;
        const paths = this.props.paths;
        const last = this.props.last;
        const lastPath = this.props.lastPath;
        const tools = this.props.tools;

        paper.clear();

        var wpIndex = {};
        points.forEach(function(p) {
            var circle = paper.circle(p.x, p.y, (!!last && p.id === last.id) ? 12 : 9);    
            circle.attr("fill", (tools.dropNodes) ? "#D4A76A" : "#553100");
            circle.attr("stroke", "#fff");
            circle.data('waypoint', {...p});

            if (!!p.type){
                circle.attr({"stroke-width":4, "stroke": "#FFDBAA"});
            }

            wpIndex[p.id] = p;
        });

        paths.forEach(function(p) {
            var path = paper.path( ["M", wpIndex[p.fromId].x, wpIndex[p.fromId].y, "L", wpIndex[p.toId].x, wpIndex[p.toId].y ] );
            path.data('path', {...p});

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
               </div>
    }
}