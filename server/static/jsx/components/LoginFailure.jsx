import React from 'react';

var LoginFailure = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Unsuccessful Login :(</h2>
        <ul>
        <p>Sorry, it seems something was wrong with your <b>username</b> or <b>password</b>.</p>
        </ul>
        <ul className="form-fields">
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Try again?</button>
          </li>
        </ul>
      </div>
    )
  }
});

export default LoginFailure;