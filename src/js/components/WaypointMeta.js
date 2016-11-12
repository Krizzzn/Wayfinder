import React from "react"



export default class Layout extends React.Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
  }

 handleChange(event) {
    this.setState({value: event.target.value});
  }

  componentDidUpdate(){

 

  }

  render() {

  	const point = this.props.point || {x: null, y: null};

    return <div class="boom">
      <form>
      {point.x}
        <div class="form-group">
          <label for="name">Name</label>
          <input type="email" class="form-control" id="name" />
        </div>
      </form>
    </div>
  }
}
