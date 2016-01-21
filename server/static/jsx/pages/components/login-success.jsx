import React from 'react';

var LoginSuccess = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Successful Login!</h2>
                <p>Welcome to Trackr, <b>{this.props.fieldValues.username}</b>!</p>
            </div>
        )
    }
});

export default LoginSuccess;