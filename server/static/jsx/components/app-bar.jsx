import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import ActionCreator from '../actions/AppBarActionCreators';
import FlatButton from 'material-ui/lib/flat-button';
import Nav from './left-nav'
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

const MainAppBar = React.createClass({

  getInitialState() {
      return {
          leftNavOpen: false,
      };
  },

  handleTouchTapLeftIconButton(e) {
      ActionCreator.openNav();
  },

    render() {
        let {
            leftNavOpen,
        } = this.state;
        let showMenuIconButton = true
        let docked = false
        const title = 'Trackr'

        return (
          <div>
            <AppBar
              onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
              title={title}
              zDepth={0}
              iconElementRight={<FlatButton label="login" />}
              showMenuIconButton={showMenuIconButton}
            />
            <Nav
              ref="leftNav"
              docked={docked}
              open={leftNavOpen}
            />
          </div>
        );
      },
});

export default MainAppBar;
