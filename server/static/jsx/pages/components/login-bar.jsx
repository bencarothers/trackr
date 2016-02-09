import React from 'react';
import Modal from 'boron/OutlineModal'
import Login_Form from './login-form'

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
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand brand-image" href="#">
                                <img alt="Brand" src="./static/img/bar.png"></img>
                            </a>
                            <div className="navbar-brand">
                              <p>Trackr</p>
                            </div>
                        </div>
                        <button className='btn navbar-btn btn-success pull-right' onClick={this.showLogin}>Login</button>
                    </div>
                </nav>
                <Login_Form className='pull-right' ref="modal"></Login_Form>
            </div>
        );
    }
});

export default LoginAppBar;
