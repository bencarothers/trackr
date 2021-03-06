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

  previousStep: function () {
    this.setState({
      step: this.state.step - 1
    })
  },

  successStep: function () {
    this.setState({
      step: 3
    })
    this.registerUser()
  },

  failureStep: function () {
    this.setState({
      step: 2
    })
  },

  show: function () {
    this.refs.show();
  },

  hide: function () {
    this.refs.hide();
  },


  submitRegistration: function () {
    var user_id = this.fieldValues.username
    var email = this.fieldValues.email
    var failureReason = "Value of user_id is " + user_id;
    var Url = "/api_check/" + user_id + "/" + email;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", Url, false);
    xmlHttp.send(null);
    var response = xmlHttp.responseText;
    var result = JSON.parse(response)
    if (result.status == "ok") {
      this.successStep()
    } else {
      this.failureStep()
    }
  },

  registerUser: function () {
    var Url = "/api_post/" + this.fieldValues.username + "/" + this.fieldValues.password + "/" + this.fieldValues.email + "/";
    var response = null
    jQuery.ajax({
      async: false,
      url: Url,
      type: 'POST',
      data: null,
      dataType: 'json',
      success: function (data) {
      }
    });
  },

  closeModal: function () {
    this.props.hideRegister();
    this.props.closeModal();
  },

  showStep: function () {
    switch (this.state.step) {
      case 1:
        return <AccountFields fieldValues={this.fieldValues}
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
