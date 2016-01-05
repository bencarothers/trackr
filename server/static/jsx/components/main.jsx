import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Nav from './left_nav'
import Add from './add_video'
import Lift from './lift_card'

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(DarkRawTheme),
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

  render() {
    return (
      <div>
        <Nav/>
        <Add/>
      </div>
    );
  },
});

export default Main;
