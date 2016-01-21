import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import Modal from 'boron/OutlineModal'
import Login_Form from './login-form'
import Nav from './left-nav'

const LoginAppBar = React.createClass({

    showLogin(){
        this.refs.modal.show();
    },

    handleSubmit(){
        this.refs.modal.hide();
    },

    render() {

        const title = 'Trackr'

        return (
            <div >
                <AppBar
                    title={title}
                    zDepth={0}
                    iconElementRight={
                    <div>
                        <FlatButton onClick={this.showLogin}>Login</FlatButton>
                        <Login_Form ref="modal">
                        </Login_Form>
                     </div>
                }
                >
                </AppBar>
            </div>
        );
    }
});

export default LoginAppBar;
