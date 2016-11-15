import { applyMiddleware } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import sharedState from "./sharedState"
import idProvider from "./idProvider"

export default applyMiddleware(promise(), idProvider, sharedState, thunk, logger())