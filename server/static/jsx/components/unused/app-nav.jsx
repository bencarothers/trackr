import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AppBar from 'material-ui/lib/app-bar';
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin()

const Nav = React.createClass({

  getInitialState() {
      return this.state = {open: false};
  },

  handleToggle(){
      this.setState({open: !this.state.open});
  },

  handleClose(){
      this.setState({open: false});
  },

  render() {
    return (
      <div>
        <FlatButton
          label="Trackr"
          onTouchTap={this.handleToggle} />
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </LeftNav>
      </div>
    );
  }
});
export default Nav;
