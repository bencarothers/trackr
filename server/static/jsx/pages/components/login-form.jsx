import React from 'react';
import assign from 'object-assign';
import Modal from 'boron/OutlineModal'
import LoginFields from './login-fields';
import LoginSuccess from './login-success';
import LoginFailure from './login-failure';


var fieldValues = {
    username: null,
    password: null
}

var Login_Form = React.createClass({
    getInitialState: function () {
        return {
            step: 1
        }
    },

    saveValues: function (field_value) {
        return function () {
            fieldValues = assign({}, fieldValues, field_value)
        }.bind(this)()
    },

    successStep: function () {
        this.setState({
            step: 3
        })
    },

    failureStep: function () {
        this.setState({
            step: 2
        })
    },

    previousStep: function () {
        this.setState({
            step: 1
        })
    },

    submitLogin: function () {
        //Logic here to determine which step to go to, (SUCCESS step or FAILURE step)
        this.loginUser()
    },

    loginUser: function () {
        console.log("Function ran in parent")
        var user_id = fieldValues.username
        var password = fieldValues.password
        var Url = "/api_get/" + user_id + "/" + password;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", Url, true);
        xmlHttp.send(null);
        var result = xmlHttp.responseText;
        var result = JSON.parse(response)
        console.log(response)
        if (result.status == 'ok') {
            this.successStep()
        }
        else {
            this.failureStep()
        }
    },

    show: function () {
        this.refs.modal.show();
    },

    hide: function () {
        this.refs.modal.hide();
    },


    showStep: function () {

        switch (this.state.step) {
            case 1:
                return <LoginFields fieldValues={fieldValues}
                                    saveValues={this.saveValues}
                                    submitLogin={this.submitLogin}
                                    successStep={this.successStep}
                                    failureStep={this.failureStep}
                                    showRegister={this.showRegister}
                                    hideRegister={this.hideRegister}
                                    className="container"
                />
            case 2:
                return <LoginFailure
                    previousStep={this.previousStep}/>
            case 3:
                return <LoginSuccess fieldValues={fieldValues}/>
        }
    },

    render(){
        var divStyle = {
            padding: '2em',
            textAlign: 'center'
        }

        return (
            <Modal ref='modal'>
                <div style={divStyle}>
                    {this.showStep()}
                </div>
            </Modal>
        );
    }
});

export default Login_Form;
