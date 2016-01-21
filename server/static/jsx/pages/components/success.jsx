import React from 'react';

var Success = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Successfully Registered!</h2>
                <ul>
                    <li>Please check your email <b> {this.props.fieldValues.email}</b> for a confirmation email!</li>
                </ul>
            </div>
        )
    }
});

export default Success;