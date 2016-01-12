import React from 'react';

var loginResult = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Successfully Logged In!</h2>
        <ul>
        <p>Welcome to Trackr,<b>{this.props.fieldValues.username}</b>for a confirmation email!</p>
        </ul>
      </div>
    )
  }
});

export default Success;