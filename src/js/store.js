import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"


const sharedState = store => next => action => {
  const {tools, waypoint, path} = store.getState();
  action.tools = tools
  
  if (waypoint)
  	action.lastPoint = waypoint.lastWaypoint
  if (path)
  	action.lastPath = path.lastPath
  return next(action)
}

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), sharedState, thunk, logger())

export default createStore(reducer, middleware)
