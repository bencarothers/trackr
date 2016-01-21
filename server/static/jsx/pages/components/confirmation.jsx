import React from 'react';

var Confirmation = React.createClass({
    render: function () {
        return (
            <div>
                <div className="form-group row">
                    <h2>Confirm Registration</h2>
                </div>
                <div className="form-group row">
                    <h5><b>Username:</b> {this.props.fieldValues.username}</h5>
                    <h5><b>Email:</b> {this.props.fieldValues.email}</h5>
                </div>
                <div className="form-group row">
                    <button className="btn btn-primary col-md-offset-2 col-md-3" onClick={this.props.submitRegistration}>Submit</button>
                    <button className="btn btn-default col-md-offset-2 col-md-3" onClick={this.props.previousStep}>Back</button>

                </div>
            </div>
        )
    }
});

export default Confirmation;