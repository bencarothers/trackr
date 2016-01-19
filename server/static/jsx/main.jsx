"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Dash from './pages/Dash';
import Home from './pages/Home';

const App = React.createClass({
  getInitialState(){
    return {
      route: window.location.hash.substr(1)
    }
  },

  componentDidMount(){
    window.addEventListener('hashchange', () => {
      this.setState({
        route : window.location.hash.substr(1)
      })
    })
  },

  render(){
    let Child
    switch (this.state.route){
      case '/dash': Child = Dash; break;
      default: Child = Home; 
    }
    return(
      <Child/>
    )
  }
})

ReactDOM.render(<App/>, document.getElementById('app'));
