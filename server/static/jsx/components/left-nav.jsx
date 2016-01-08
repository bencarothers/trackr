import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';

const Nav = React.createClass({


  getInitialState() {
      return {
          leftNavOpen: false,
      };
  },

  handleTouchTapHeader() {
    this.setState({
      open: !this.state.leftNavOpen,
    });
  },


  render() {
    const {
      docked,
      onRequestChangeLeftNav,
      onRequestChangeList,
      open,
    } = this.props;


    return (
      <LeftNav
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeLeftNav}
      >
        <div
          onTouchTap={this.handleTouchTapHeader}
        >
            trackr 
        </div>
      </LeftNav>
    );
  },
});

export default Nav;
