import React from 'react';

var AccountFields = React.createClass({

    nextStep: function (e) {
        e.preventDefault()

        var data = {
            username: this.refs.username.value,
            password: this.refs.password.value,
            email: this.refs.email.value
        }
        this.props.saveValues(data)
        this.props.nextStep()
    },

    render: function () {
        return (
            <div>
                <div className="form-group row pull-right">
                    <a onClick={this.props.closeModal}><i className="fa fa-times"></i></a>
                </div>

                <div className="form-group row text-center">
                    <img id='biceps' src='../static/img/Flex.png'></img>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-2 col-md-8" placeholder="username" type="text" ref='username'
                           defaultValue={this.props.fieldValues.username}/>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-2 col-md-8" placeholder="password" type="password" ref="password"
                           defaultValue={this.props.fieldValues.password}/>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-2 col-md-8" placeholder="email" type="email" ref="email"
                           defaultValue={this.props.fieldValues.email}/>
                </div>

                <div className="form-group row">
                    <button type='button' className="btn btn-primary col-md-offset-3 col-md-3 margin-right" 
                    onClick={this.nextStep}>Submit
                    </button>

                    <button type='button' className="btn btn-warning col-md-3" 
                    onClick={this.props.hideRegister}>Back
                    </button>
                </div>

                <div className="form-group row ">
                    <a className="col-md-12" href='/authorize/google'><img src="../static/img/sign-in-with-google.png"/></a>
                </div>

            </div>
        )
    }
})

export default AccountFields;
