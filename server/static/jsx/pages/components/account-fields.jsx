import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

var AccountFields = React.createClass({
    render: function () {
        return (
            <div>

                <div className="form-group row">
                    <h2 className="col-md-12 text-center">Register for Trackr</h2>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-1 col-md-10" placeholder="username" type="text" ref='username'
                           defaultValue={this.props.fieldValues.username}/>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-1 col-md-10" placeholder="password" type="password" ref="password"
                           defaultValue={this.props.fieldValues.password}/>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-1 col-md-10" placeholder="email" type="email" ref="email"
                           defaultValue={this.props.fieldValues.email}/>
                </div>

                <br></br>

                <div className="form-group row">
                    <button type='button' className="btn btn-primary col-md-offset-3 col-md-6" onClick={this.nextStep}>
                        Submit
                    </button>
                </div>

                <div className="form-group row ">
                    <a className="col-md-12" href='/authorize/google'><img src="../static/img/sign-in-with-google.png"/></a>
                </div>

            </div>
        )
    },

    nextStep: function (e) {
        e.preventDefault()

        var data = {
            username: this.refs.username.value,
            password: this.refs.password.value,
            email: this.refs.email.value
        }
        this.props.saveValues(data)
        this.props.nextStep()
    }
})

export default AccountFields;
