import React from 'react';
import assign from 'object-assign';
import AccountFields from './account-fields';
import Success from './success';
import Failure from './failure';
import Modal from 'boron/OutlineModal'
import jQuery from 'jquery'


var Registration = React.createClass({
    getInitialState: function () {
        return {
            step: 1,
        }
    },

    fieldValues: {
      username: null,
      email: null,
      password: null
    },

    saveValues: function (data) {
        this.fieldValues.username = data.username 
        this.fieldValues.email = data.email
        this.fieldValues.password = data.password
    },

    nextStep: function () {
        this.setState({
            step: this.state.step + 1
        })
    },

    previousStep: function () {
        this.setState({
            step: this.state.step - 1
        })
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

    show: function () {
        this.refs.reg.show();
    },

    hide: function () {
        this.refs.reg.hide();
    },


    submitRegistration: function () {
        var user_id = this.fieldValues.username
        var email = this.fieldValues.email
        var failureReason = "Value of user_id is " + user_id;
        console.log(failureReason)
        var Url = "/api_check/" + user_id + "/" + email;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", Url, false);
        xmlHttp.send(null);
        var response = xmlHttp.responseText;
        var result = JSON.parse(response)
        console.log(result)
        if (result.status == "ok") {
            this.successStep()
            this.registerUser()
        }else {
            this.failureStep()
        }
    },

    registerUser: function () {
        var Url = "/api_post/" + this.fieldValues.username + "/" + this.fieldValues.password + "/" + this.fieldValues.email + "/";
        console.log("URL SENT TO API IS " + Url);
        var response = null
        jQuery.ajax({
            async: false,
            url: Url,
            type: 'POST',
            data: null,
            dataType: 'json',
            success: function (data){
            }
        });
    },
    closeModal: function(){
        this.props.hideRegister();
        this.props.closeModal();
    },

    showStep: function () {
        switch (this.state.step) {
            case 1:
                return <AccountFields fieldValues={this.fieldValues}
                                      nextStep={this.nextStep}
                                      hideRegister={this.props.hideRegister}
                                      closeModal={this.closeModal}
                                      saveValues={this.saveValues}
                                      submitRegistration={this.submitRegistration}/>
            case 2:
                return <Failure fieldValues={this.fieldValues}
                                previousStep={this.previousStep}/>
            case 3:
                return <Success fieldValues={this.fieldValues}/>

        }
    },

    render(){
        return (
                <div>
                    {this.showStep()}
                </div>
        )
    }
});

export default Registration;
