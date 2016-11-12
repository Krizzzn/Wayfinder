import { combineReducers } from "redux"

import floorplan from "./floorplanReducer"
import waypoint from "./waypointReducer"
import path from "./pathReducer"
import tools from "./toolsReducer"

export default combineReducers({
  floorplan,
  path,
  waypoint, 
  tools
})
