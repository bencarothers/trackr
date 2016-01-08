import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Camera from 'material-ui/lib/svg-icons/image/camera'; 
import Lift from './lift_card'

const Add = React.createClass({
        clickHandle() {
            React.render(<Lift />, document.getElementById('app'));
        },

    render() {
        var buttonStyle= {
            marginLeft: '290px',
            marginTop: '30px',
            paddng: '50px'
        }
        return(
          <FloatingActionButton style={buttonStyle} onClick={this.clickHandle}>
               <Camera />
          </FloatingActionButton>);
      }
});

export default Add;
