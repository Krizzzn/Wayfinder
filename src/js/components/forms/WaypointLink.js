
import React from 'react';


class WaypointLinks extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      link: null
    };

    this.handleChange = this.handleChange.bind(this);
  } 

  handleChange(event) {

    var value = undefined;
    if (event.target.value)
      value = parseInt(event.target.value);
    this.setState({link: value});
  }

  render() {

    const { links, value, onChange, input } = this.props;

    const linksTo = (input.value||[]).map(pid => {
      const p = links.find(ln => ln.id === pid);
      return <div>{p.floor} - {p.roomName}</div>});

    var linkOptions = links.map(p => <option value={p.id} key={p.id}>{p.floor} - {p.roomName}</option>);

    return (
          <div class="form-group">
            <label htmlFor="linkTo">Link to other Floorplan</label>
            <select name="linkTo" component="select" class="form-control" onChange={this.handleChange}>
              <option value="">---</option>
              {linkOptions}
            </select>
            {this.state.link && <button type="button" class="btn btn-default" onClick={() => input.onChange([...input.value, this.state.link])}>add link</button>}
            {linksTo}
          </div>
    );
  }
}

export default WaypointLinks;
