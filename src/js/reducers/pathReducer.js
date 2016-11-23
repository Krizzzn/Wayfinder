export default function reducer(state={
    paths: [
      {fromId: 1, toId: 2}
    ],
    lastPath: null
  }, action) {

    var findPath = (path1, path2) => Math.max(path1.fromId, path1.toId) === Math.max(path2.fromId, path2.toId) &&
                                     Math.min(path1.fromId, path1.toId) === Math.min(path2.fromId, path2.toId);

    switch (action.type) {
      case "CHANGE_FLOORPLAN":{
        return {
          ...state,
          paths: [],
          lastPath: null
        }
      }
      case "DESELECT":{
        return {
          ...state,
          lastPath: null
        }
      }
      case "RETRACT": {
        var waypoint = action.lastPoint;
        var path = action.lastPath;
        if (waypoint){
          return {
            ...state,
            paths: state.paths.filter(p => !((p.fromId === waypoint.id) || (p.toId === waypoint.id))),
            lastPath: null
          };
        }
        else if(path){
          return {
            ...state,
            paths: [...state.paths].filter(p => !findPath(p, path)),
            lastPath: null
          };
       }
       break;
        
      }
      case "CONNECT_WAYPOINT":
      case "CLICKED_FLOORPLAN": {

        if (!action.payload.lastWaypoint)
          break;

        const path = {fromId: Math.min(action.payload.waypoint.id, action.payload.lastWaypoint.id), 
                      toId:   Math.max(action.payload.waypoint.id, action.payload.lastWaypoint.id)}

        return {
          ...state,
          paths: [...state.paths, path],
          lastPath: path
        };
      }
      case "SELECT_PATH": {

        if (!action.payload.path)
          break;

        const pathToSelect = action.payload.path;

        var path = state.paths.find(p => findPath(p, pathToSelect));

        return {
          ...state,
          lastPath: path
        };
      }
      case "SPLIT_PATH": {

        if (!action.payload.waypoint || !action.payload.path)
          break;

        const pathToRemove = action.payload.path;
        const wp = action.lastPoint;

        var paths = [...state.paths].filter(p => !findPath(p, pathToRemove));

        const lastPath = {fromId: wp.id, toId: pathToRemove.toId}
        paths = [...paths, lastPath, {toId: wp.id, fromId: pathToRemove.fromId}]

        return {
          ...state,
          paths: paths,
          lastPath: null//lastPath
        };
      }
  }

    return state;
}
