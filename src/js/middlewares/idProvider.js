var _id = undefined;

function nextId(store) {

	if (!_id){
		_id = 0;
		const waypoints = store.getState().waypoint.waypoints;
		waypoints.forEach(wp => _id = Math.max(_id, wp.id))
	}
	return ++_id;
}

export default store => next => action => {

  switch(action.type){
  	case "CHANGE_FLOORPLAN":
  		_id = undefined;
  		break;
  	case "CREATE_WAYPOINT":
    case "CLICKED_FLOORPLAN":
    	action.payload.waypoint = {...action.payload.waypoint, id: nextId(store) }
    	break;
  }

  return next(action)
}
