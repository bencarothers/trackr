import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Dash from './dash'
import { render }from 'react-dom';

var Home = React.createClass({

  getInitialState: function(){
    return {
      username: ''
    };
  },


  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  componentDidMount: function(){
    $.get(this.props.source, function(result){
      var response = JSON.parse(result)
      var user_id = response.user.user_id;
      if(this.isMounted()){
        this.setState({
          username: user_id
        });
      }
    }.bind(this));
    },

  render() {
    return (
      <div>
      <Dash/>
      <div id= "example"></div>
      Welcome, {this.state.username}!
      </div>
    );
  },
});

React.renderComponent(
  <Home source="http://localhost:5000/current_user/"/>,
  document.getElementById('example')
);

export default Home;
