import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

var LoginFailure = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Unsuccessful Login :(</h2>
        <ul>
        <p>Sorry, it seems something was wrong with your <b>username</b> or <b>password</b></p>
        </ul>
        <ul className="form-fields">
          <li className="form-footer">
            <FlatButton onClick={this.props.previousStep}>Try again?</FlatButton>
          </li>
        </ul>
      </div>
    )
  }
});

export default LoginFailure;