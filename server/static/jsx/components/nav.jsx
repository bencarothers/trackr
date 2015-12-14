import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

const menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
    ];

const Nav = React.createClass({

    render() {
        return(
            <LeftNav ref="leftNav" menuItems={menuItems} />
        );
    }
});

export default Nav;

