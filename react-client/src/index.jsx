import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/Table.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    };
  }

  componentDidMount() {
    this.setState({
      items: [1, 2, 3, 4, 5]
    });
  }

  render () {
    return (<div>
      <h1>Hacking Incidents</h1>
      <List items={this.state.items}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));