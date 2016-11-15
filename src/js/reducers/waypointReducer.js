export default function reducer(state={
    waypoints: [
      {id: 1, floor: "Floor 1", x: 100, y: 100},
      {id: 2, floor: "Floor 1", x: 100, y: 200, type: "Stair", roomName: "boombab", links: [134, 135]},
    ],
    lastWaypoint: null,
    links: [
      {roomName: "Room A", floor: "Floor 1", id: 134},
      {roomName: "Room B", floor: "Floor 1", id: 135},
      {roomName: "Room C", floor: "Floor 1", id: 136},
      {roomName: "Room D", floor: "Floor 1", id: 137},

      {roomName: "Room A", floor: "Floor 2", id: 353},
      {roomName: "Room B", floor: "Floor 2", id: 373},
      {roomName: "Room C", floor: "Floor 2", id: 313},
    ]
  }, action) {

    switch (action.type) {
      case "CHANGE_FLOORPLAN":{
        return {
          ...state,
          waypoints: [],
          lastWaypoint: null
        }
      }
      case "DESELECT":{
        return {
          ...state,
          lastWaypoint: null
        }
      }
      case "CREATE_WAYPOINT":
      case "CLICKED_FLOORPLAN": {

        var waypoint = action.payload.waypoint;

        return {
          ...state,
          waypoints: [...state.waypoints, waypoint],
          lastWaypoint: waypoint
        }
      }
      case "UPDATE_WAYPOINT":{
        const updatedWaypoint = action.payload;
        const updatedState = {...state,
          lastWaypoint: null,
          waypoints: [...state.waypoints]
        };

        var wp = updatedState.waypoints.find(wp => (wp.x === updatedWaypoint.x && wp.y === updatedWaypoint.y));
        wp.type = updatedWaypoint.type;
        wp.roomName = updatedWaypoint.roomName;
        wp.links = updatedWaypoint.links;
        updatedState.lastWaypoint = wp;

        return updatedState;
      }
      case "SELECTED_WAYPOINT": {

        var waypoint = action.payload.waypoint;

        return {
          ...state,
          lastWaypoint: waypoint
        }
      }
      case "RETRACT": {
        var waypoint = action.lastPoint;
        if (!waypoint)
          break;

        return {
          ...state,
          waypoints: state.waypoints.filter(wp => !(wp.x === waypoint.x && wp.y === waypoint.y)),
          lastWaypoint: null
        };
      }
  }

    return state;
}
