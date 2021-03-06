import React from "react"

import Floorplan from "./Floorplan"
import Grid from "./Grid"
import Tools from "./Tools"
import Form from "./Form"

export default class Layout extends React.Component {
  render() {
    return <div>
      <Tools/>
      <Form/>
      <Grid>
        <Floorplan/>
      </Grid>
    </div>
  }
}
