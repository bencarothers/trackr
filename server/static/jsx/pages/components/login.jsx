import React from 'react';
import LoginAppBar from './login-bar'
import LiftGallery from './lift-gallery'
import Jumbo from './jumbo.jsx'
const Login = React.createClass({

    render() {
        return (
            <div>
                <LoginAppBar handleResponse={this.handleResponse}></LoginAppBar>
                <Jumbo id='skinnyJumbo'></Jumbo>
            </div>
        );
    }
});

export default Login;