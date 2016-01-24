"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Dash from './pages/Dash';
import Home from './pages/Home';
import jQuery from 'jquery'

const App = React.createClass({
  getInitialState(){
    var response = ''
    jQuery.ajax({
        async: false,
        url: "http://localhost:5000/current_user/",
        type: 'GET',
        data: null,
        dataType: 'json',
        success: function (data){
          response = data.status
      }});
    console.log("The value of response is ",response)
    if (response == 'ok'){
         return{
      route: '/dash'
          }
    }
    else{
        return {
      route: window.location.hash.substr(1)
         }
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
