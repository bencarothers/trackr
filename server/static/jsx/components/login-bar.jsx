import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin"
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Modal from 'boron/OutlineModal'
import Login_Form from './Login_Form'

const LoginAppBar = React.createClass({

    showLogin(){
        this.refs.modal.show();
    },

    handleSubmit(){
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
                        <FlatButton onClick={this.showLogin}>Login</FlatButton>
                        <div style={styles.container}>
                          <Modal ref="modal">
                              <div>
                              <Login_Form/>
                              </div>
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

export default LoginAppBar;
