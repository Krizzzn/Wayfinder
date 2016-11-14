export default store => next => action => {
  const {tools, waypoint, path} = store.getState();
  action.tools = tools
  
  if (waypoint)
  	action.lastPoint = waypoint.lastWaypoint
  if (path)
  	action.lastPath = path.lastPath

  return next(action)
}