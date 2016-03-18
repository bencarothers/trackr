import React from 'react';

var LoginFailure = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row ">
          <h2>Unsuccessful Login</h2>
        </div>
        <div className="row ">
          <p>Sorry, it seems something was wrong with your <b>username</b> or <b>password</b></p>
        </div>
        <div className="row ">
          <button className="btn btn-danger" onClick={this.props.previousStep}>Try again?</button>
        </div>
      </div>
    )
  }
});

export default LoginFailure;