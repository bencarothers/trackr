import React from 'react';
import assign from 'object-assign';
import Modal from 'boron/OutlineModal'
import LoginFields from './login-fields';
import LoginSuccess from './login-success';
import LoginFailure from './login-failure';
import Registration from './registration'
import jQuery from 'jquery';

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

  showRegister: function () {
    this.setState({
      step: 2
    })
  },

  hideRegister: function () {
    this.setState({
      step: 1
    })
  },

  successStep: function () {
    this.setState({
      step: 4
    })
  },

  failureStep: function () {
    this.setState({
      step: 3
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
    var user_id = fieldValues.username
    var password = fieldValues.password
    var Url = "/api_get/" + user_id + "/" + password;
    var response = null
    jQuery.post(Url).done(function (result) {
    }.bind(response));
    var result = JSON.parse(response)
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
                            closeModal={this.hide}
                            className="container"
        />
      case 2:
        return <Registration ref="reg" hideRegister={this.hideRegister} closeModal={this.hide}/>
      case 3:
        return <LoginFailure previousStep={this.previousStep}/>
      case 4:
        return <LoginSuccess fieldValues={fieldValues}/>
    }
  },

  render(){
    var divStyle = {
      background: 'lightgrey',
      padding: '2em',
      textAlign: 'center'
    }

    return (
      <Modal ref='modal' onHide={this.hideRegister}>
        <div style={divStyle}>
          {this.showStep()}
        </div>
      </Modal>
    );
  }
});

export default Login_Form;
