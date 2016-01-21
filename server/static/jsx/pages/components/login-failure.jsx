import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

var LoginFailure = React.createClass({
    render: function () {
        return (
            <div>
                <div className="row ">
                    <h2>Unsuccessful Login</h2>
                </div>
                <div className="row ">
                    <p>Sorry, it seems something was wrong with your <b>username</b> or <b>password</b></p>
                </div>
                <div className="row ">
                    <FlatButton onClick={this.props.previousStep}>Try again?</FlatButton>
                </div>
            </div>
        )
    }
});

export default LoginFailure;