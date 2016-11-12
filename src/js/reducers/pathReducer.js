export default function reducer(state={
    paths: [

    ],
    lastPath: null
  }, action) {

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
            paths: state.paths.filter(p => !((p.to.x === waypoint.x && p.to.y === waypoint.y) || (p.from.x === waypoint.x && p.from.y === waypoint.y))),
            lastPath: null
          };
        }
        else if(path){
          return {
            ...state,
            paths: [...state.paths].filter(p => !((p.from.x === path.from.x && p.from.y === path.from.y) && 
                                                  (p.to.x   === path.to.x &&   p.to.y   === path.to.y))),
            lastPath: null
          };
       }
       break;
        
      }
      case "CONNECT_WAYPOINT":
      case "CLICKED_FLOORPLAN": {

        if (!action.payload.lastWaypoint)
          break;

        const path = {to: action.payload.waypoint, 
                      from: action.payload.lastWaypoint}

        return {
          ...state,
          paths: [...state.paths, path],
          lastPath: path
        };
      }
      case "SELECT_PATH": {
        console.log('adasdads')
        if (!action.payload.path)
          break;

        const pathToSelect = action.payload.path;


        var path = state.paths.find(p => ((p.from.x === pathToSelect.from.x && p.from.y === pathToSelect.from.y) && 
                                           (p.to.x   === pathToSelect.to.x &&   p.to.y   === pathToSelect.to.y)));
        console.log(path);
        return {
          ...state,
          lastPath: path
        };
      }
      case "SPLIT_PATH": {

        if (!action.payload.waypoint || !action.payload.path)
          break;

        const pathToRemove = action.payload.path;
        const wp = action.payload.waypoint;

        var paths = [...state.paths].filter(p => !((p.from.x === pathToRemove.from.x && p.from.y === pathToRemove.from.y) && 
                                                   (p.to.x   === pathToRemove.to.x &&   p.to.y   === pathToRemove.to.y)));

        const lastPath = {from: wp, to: pathToRemove.to}
        paths = [...paths, lastPath, {to: wp, from: pathToRemove.from}]

        return {
          ...state,
          paths: paths,
          lastPath: lastPath
        };
      }
  }

    return state;
}
