import React from "react"

import Floorplan from "./Floorplan"
import Grid from "./Grid"
import Tools from "./Tools"

export default class Layout extends React.Component {
  render() {
    return <div>
      <Tools/>
      <Grid>
        <Floorplan/>
      </Grid>
    </div>
  }
}
