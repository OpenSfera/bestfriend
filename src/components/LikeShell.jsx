import React from 'react';
import ReactDOM from 'react-dom';
require('./likeashell.css');

class LikeShell extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: props.id,
      content: props.content
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({content: nextProps.content})
    let output = this.refs.output;
    output.scrollTop = output.scrollHeight;
  }

  render() {
    return <div className="like-a-shell">
      <span>{this.state.name}</span>
      <ul ref="output">
        {this.state.content.map( (item, key) => (
           <li className='indent' key={key}>{item}</li>
        ))}
      </ul>
    </div>;

  }
};

export default LikeShell;
