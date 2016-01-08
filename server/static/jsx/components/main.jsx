import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item';
import GridListExampleSimple from '../containers/lift-gallery'
import MainAppBar from './app-bar'

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

  render() {
    return (
      <div>
        <MainAppBar/>
        <GridListExampleSimple/>
      </div>
    );
  },
});

export default Main;
