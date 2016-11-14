import { applyMiddleware } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import sharedState from "./sharedState"

export default applyMiddleware(promise(), sharedState, thunk, logger())