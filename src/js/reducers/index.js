import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'

import floorplan from "./floorplanReducer"
import waypoint from "./waypointReducer"
import path from "./pathReducer"
import tools from "./toolsReducer"

export default combineReducers({
  floorplan,
  path,
  waypoint, 
  tools,
  form: formReducer 
})