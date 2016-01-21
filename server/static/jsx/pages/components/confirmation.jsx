import React from 'react';

var Confirmation = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Confirm Registration</h2>
                <h5><b>Username:</b> {this.props.fieldValues.username}</h5>
                <h5><b>Email:</b> {this.props.fieldValues.email}</h5>

                <button className="btn -default pull-left" onClick={this.props.previousStep}>Back</button>
                <button className="btn -primary pull-right" onClick={this.props.submitRegistration}>Submit</button>
            </div>
        )
    }
});

export default Confirmation;