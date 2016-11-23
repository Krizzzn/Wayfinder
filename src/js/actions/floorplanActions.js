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

export function selectWaypoint(selectedWp, shift) {

  return (dispatch, getState) => {

    var rect = event.target.getBoundingClientRect();
    const {waypoint} = getState();

    var found = waypoint.waypoints.find(wp => wp.id == selectedWp.id);
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

export function selectPath(pathToSelect) {

  return (dispatch, getState) => {


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

    var pathToRemove = path;

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