import React from 'react';

var Failure = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Couldn't register.</h2>
                <ul>
                    <p>It looks like you already have an account, <b> {this.props.fieldValues.username}</b></p>
                </ul>
                <ul className="form-fields">
                    <li className="form-footer">
                        <button className="btn -default pull-left" onClick={this.props.previousStep}>Try again?</button>
                    </li>
                </ul>
            </div>
        )
    }
});

export default Failure;