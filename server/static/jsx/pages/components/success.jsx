import React from 'react';

var Success = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <h2>Successfully Registered!</h2>
        </div>
        <div className="row">
          <p>Please check your email <b> {this.props.fieldValues.email}</b> for a confirmation email!</p>
        </div>
      </div>
    )
  }
});

export default Success;