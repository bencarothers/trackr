import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin"
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

injectTapEventPlugin()

const MainAppBar = React.createClass({

    render() {

        let showMenuIconButton = true
        const title = 'Trackr'

        return (
          <div>
            <AppBar
              onLeftIconButtonTouchTap={this._toggle}
              title={title}
              zDepth={0}
              iconElementRight={
                  <IconMenu
                  iconButtonElement={
                  <IconButton><MoreVertIcon/></IconButton>
                  }
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                  <MenuItem primaryText="Sign in" />
                  <MenuItem primaryText="Add a Video" />
                  <MenuItem primaryText="Help" />
                  </IconMenu> 
              }
              showMenuIconButton={showMenuIconButton}
            />
        </div>
        );
      },
});

export default MainAppBar;
