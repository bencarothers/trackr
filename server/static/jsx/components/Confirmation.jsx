import React from 'react';

var Confirmation = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Confirm Registration</h2>
        <ul>
          <li><b>Name:</b> {this.props.fieldValues.username}</li>
          <li><b>Email:</b> {this.props.fieldValues.email}</li>
        </ul>
        <ul className="form-fields">
          <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
            <button className="btn -primary pull-right" onClick={this.props.nextStep}>Submit </button>
          </li>
        </ul>
      </div>
    )
  }
})

export default Confirmation;