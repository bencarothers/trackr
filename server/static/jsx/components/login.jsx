import React from 'react';
import LoginAppBar from './login-bar'
import LiftGallery from './lift-gallery'

const Login = React.createClass({

  render() {
    return (
      <div>
        <LoginAppBar handleResponse={this.handleResponse}/>
      </div>
    );
  }
});

export default Login;
