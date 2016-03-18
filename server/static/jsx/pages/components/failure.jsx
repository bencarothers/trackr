import React from 'react';

var Failure = React.createClass({
  render: function () {
    return (
      <div>
        <div className="form-group row">
          <h2>Couldn't register.</h2>
        </div>
        <div className="form-group row">
          <p>It looks like you already have an account, <b> {this.props.fieldValues.username}</b></p>
        </div>
        <div className="form-group row">
          <button className="btn -default pull-left" onClick={this.props.previousStep}>Try again?</button>
        </div>
      </div>
    )
  }
});

export default Failure;