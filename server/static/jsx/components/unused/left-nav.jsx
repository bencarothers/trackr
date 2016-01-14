import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';

const Nav = React.createClass({

    getInitialState() {
        return {
            open : false,
        };
    },

  render() {
     const {
         docked,
         open,
         ref,
         onRequestChangeLeftNav,
      } = this.props;

    return (
      <LeftNav
        docked={docked}
        ref={ref}
        open={this.state.open}
        onRequestChange={open => this.setState({open})}
      >
      <div >
        trackr 
      </div>
      </LeftNav>
    );
  },
});

export default Nav;
