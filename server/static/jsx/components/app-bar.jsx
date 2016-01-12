import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin"
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Modal from 'boron/OutlineModal'

const MainAppBar = React.createClass({

    addLift(){
        this.refs.modal.show();
    },

    handleSubmit(){
       var formData = {
             img: React.findDOMNode(this.refs.lift).value,
             title: React.findDOMNode(this.refs.weight).value,
             author: React.findDOMNode(this.refs.video).value
       };
       this.props.handleResponse(formData)
       this.refs.modal.hide();
    },

    render() {

        var styles = {
          btn: {
                margin: '1em auto',
                padding: '1em 2em',
                outline: 'none',
                fontSize: 16,
                fontWeight: '600',
                background: '#C94E50',
                color: '#FFFFFF',
                border: 'none'
            },
          container: {
                textAlign: 'center'
            }
        }
        const title = 'Trackr'

        return (
          <div >
           <AppBar
               title={title}
               zDepth={0}
               iconElementRight={
                    <div>
                        <FlatButton onClick={this.addLift}>Add</FlatButton>
                        <div style={styles.container}>
                          <Modal ref="modal">
                              <form action="">
                                 Lift: <input type="text" ref="lift"></input><br></br>
                                 Weight: <input type="text" ref="weight"></input><br></br>
                                 Video: <input type="text" ref="video"></input><br></br><br></br>
                              </form>
                              <FlatButton onClick={this.handleSubmit} style={styles.button}>Add a Lift</FlatButton>
                          </Modal>
                        </div>
                     </div>
              }
           >
           </AppBar>
          </div>
       );
    },
});

export default MainAppBar;
