
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
      return <li class="list-group-item">
                {p.floor} - {p.roomName} 
                <a href="javascript:void(0)" onClick={() => input.onChange([...input.value].filter(f => f !== pid))}><span class="glyphicon glyphicon-trash"></span></a>
             </li>});

    var linkOptions = links.map(p => <option value={p.id} key={p.id}>{p.floor} - {p.roomName}</option>);

    return (
          <div class="form-group">
            <label htmlFor="linkTo">Link to other Floorplan</label>
            <select name="linkTo" component="select" class="form-control" onChange={this.handleChange}>
              <option value="">---</option>
              {linkOptions}
            </select>
            {this.state.link && <button type="button" class="btn btn-default btn-block" onClick={() => input.onChange([...input.value, this.state.link])}>add link</button>}
            <br/>
            <ul class="list-group">
              {linksTo}
            </ul>
          </div>
    );
  }
}

export default WaypointLinks;
