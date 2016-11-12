export function changeFloorplan(filename) {

//  if (!filename.match(/.svg$/))
//    filename += ".svg";

  return {
    type: "CHANGE_FLOORPLAN",
    payload: filename
  }
}


var snapToPrevious = function(waypoint, lastWaypoint) {
    if (!lastWaypoint)
      return waypoint;
    
    var w = {...waypoint};
    const diffy = Math.abs(w.y - lastWaypoint.y);
    const diffx = Math.abs(w.x - lastWaypoint.x);

    if (diffy > 100 || diffx > 100)
      return w;

    if (Math.min(diffy,diffx) == diffx)
      w.x = lastWaypoint.x;
    else if (Math.min(diffy,diffx) == diffy)
      w.y = lastWaypoint.y;
    return w;
};

export function clickedPlan(event) {

  return (dispatch, getState) => {

    var rect = event.target.getBoundingClientRect();
    const {waypoint, tools} = getState();   
    var clickLocation = {x: Math.round(event.clientX - rect.left),
                         y: Math.round(event.clientY - rect.top)};

    if (tools && tools.snap)
      clickLocation = snapToPrevious(clickLocation, waypoint.lastWaypoint);
    if (tools && !tools.dropNodes)
      return 

    dispatch({
      type: "CLICKED_FLOORPLAN",
      payload: {
        waypoint: clickLocation,
        lastWaypoint: waypoint.lastWaypoint
      }});
    }
  }

export function selectWaypoint(circle, shift) {

  return (dispatch, getState) => {

    var rect = event.target.getBoundingClientRect();
    const {waypoint} = getState();   
    var clickLocation = {x: circle.cx.baseVal.value,
                         y: circle.cy.baseVal.value};

    var found = waypoint.waypoints.find(wp => Math.abs(wp.x - clickLocation.x) < 1 && Math.abs(wp.y - clickLocation.y) < 1);
    if (!found)
      return;

    dispatch({
      type: (shift) ? "CONNECT_WAYPOINT" : "SELECTED_WAYPOINT",
      payload: {
        waypoint: found,
        lastWaypoint: waypoint.lastWaypoint
      }});
    }
}

export function selectPath(path) {

  return (dispatch, getState) => {

    var pathToSelect = {
      from: {x: path.pathSegList.getItem(0).x, y: path.pathSegList.getItem(0).y},
      to:   {x: path.pathSegList.getItem(1).x, y: path.pathSegList.getItem(1).y}
    };

    dispatch({type: "DESELECT"});

    dispatch({
      type: "SELECT_PATH",
      payload: {
        path: pathToSelect  
      }});

    dispatch({type: "TOGGLE_TOOL", payload: "selectPathMode"})
    }
}

export function splitPath(path, event) {

  return (dispatch, getState) => {
    var rect = event.target.parentNode.getBoundingClientRect();
    var clickLocation = {x: Math.round(event.clientX - rect.left),
                         y: Math.round(event.clientY - rect.top)};

    var pathToRemove = {
      from: {x: path.pathSegList.getItem(0).x, y: path.pathSegList.getItem(0).y},
      to:   {x: path.pathSegList.getItem(1).x, y: path.pathSegList.getItem(1).y}
    };

    dispatch({
      type: "CREATE_WAYPOINT",
      payload: {
        waypoint: clickLocation
      }});

    dispatch({
      type: "SPLIT_PATH",
      payload: {
        waypoint: clickLocation,
        path: pathToRemove  
      }});

    dispatch({type: "TOGGLE_TOOL", payload: "selectPathMode"})
    }
}