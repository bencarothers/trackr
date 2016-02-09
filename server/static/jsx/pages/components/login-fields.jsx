import React from 'react';
import Modal from 'boron/OutlineModal'
import jQuery from 'jquery';



var LoginFields = React.createClass({

    render: function () {
        return (
            <form>

                <div className="pull-right">
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
                    <button type='button' className="btn btn-primary col-md-offset-3 col-md-3 margin-right"
                            onClick={this.submitLogin}>
                        Submit
                    </button>
                    <button type='button' className="btn btn-warning col-md-3"
                            onClick={this.props.showRegister}>Register
                    </button>
                </div>
                <div className="form-group row ">
                    <a className="col-md-12" href='/authorize/google'><img src="../static/img/sign-in-with-google.png"/></a>
                </div>
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
