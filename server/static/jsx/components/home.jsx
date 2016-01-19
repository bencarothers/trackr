import React from 'react';
import jQuery from 'jquery';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dash from './dash'
import ReactDOM from 'react-dom';


var Home = React.createClass({

  getInitialState: function(){
    return {
      username: null
    };
  },

  componentDidMount: function(){
    jQuery.get("http://localhost:5000/current_user/").done(function(result){
      console.log(result)
      var user_id = result.user;
      this.setState({ username: user_id });
    }.bind(this));
    },

  render() {
    if (this.state.username){
    return (
      <div>
      <Dash/>
      Welcome, {this.state.username}!
      </div>
    );
  }else{
     return(
    <div>Loading...</div>
    );
  }
}
});

export default Home;