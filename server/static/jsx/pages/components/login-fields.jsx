import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Registration from './registration'
import Modal from 'boron/OutlineModal'
import jQuery from 'jquery';



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
        var Url = "/api_login/" + data.username + "/" + data.password;
        var response = ''
        jQuery.ajax({
            async: false,
            url: Url,
            type: 'POST',
            data: null,
            dataType: 'json',
            success: function (data){
                response = data.status
            }        });
        if (response == 'ok'){
            this.props.successStep()
            window.setTimeout(function (){
                window.location.href = "/#/dash"
                }, 3000);
        }
        else{
            this.props.failureStep()
        }  
    },
})

export default LoginFields;
