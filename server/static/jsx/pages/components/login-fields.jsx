import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Registration from './registration'
import Modal from 'boron/OutlineModal'


var LoginFields = React.createClass({

    showRegister: function () {
        this.refs.reg.show();
    },

    hideRegister: function () {
        this.refs.reg.hide();
    },

    render: function () {
        return (
            <form>
                <div className="form-group row">
                    <h2 className="col-md-12 text-center">Login Here</h2>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-1 col-md-10" placeholder="username" type="text" ref='username'
                           defaultValue={this.props.fieldValues.username}/>
                </div>

                <div className="form-group row">
                    <input className="col-md-offset-1 col-md-10" placeholder="password" type="password" ref="password"
                           defaultValue={this.props.fieldValues.password}/>
                </div>

                <br></br>

                <div className="form-group row">
                    <button type='button' className="btn btn-primary col-md-offset-3 col-md-6"
                            onClick={this.submitLogin}>
                        Submit
                    </button>
                </div>

                <div className="form-group row ">

                    <button type='button' className="btn btn-secondary col-md-offset-3 col-md-6"
                            onClick={this.showRegister}>Register
                    </button>

                </div>
                <div className="form-group row ">
                    <a className="col-md-12" href='/authorize/google'><img src="../static/img/sign-in-with-google.png"/></a>
                </div>


                <Registration ref="reg"/>

            </form>
        )
    },

    submitLogin: function (e) {
        e.preventDefault()
        var data = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        }
        this.props.saveValues(data)
        var user_id = data.username
        var password = data.password
        var Url = "http://localhost:5000/api_login/" + user_id + "/" + password;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", Url, false);
        xmlHttp.send(null);
        var response = xmlHttp.responseText;
        var result = JSON.parse(response)
        if (result.status == "ok") {
            this.props.successStep()
            window.setTimeout(function () {
                window.location.href = "http://localhost:5000/#/dash"
            }, 3000);
        }
        else {
            this.props.failureStep()
        }
    }
})

export default LoginFields;
