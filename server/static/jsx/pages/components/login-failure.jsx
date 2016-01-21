import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

var LoginFailure = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Unsuccessful Login</h2>
                <p>Sorry, it seems something was wrong with your <b>username</b> or <b>password</b></p>
                <FlatButton onClick={this.props.previousStep}>Try again?</FlatButton>
            </div>
        )
    }
});

export default LoginFailure;