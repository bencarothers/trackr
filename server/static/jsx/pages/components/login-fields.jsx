import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Registration from './registration'
import Modal from 'boron/OutlineModal'


var LoginFields = React.createClass({

	showRegister: function(){
      this.refs.reg.show();
    },

    hideRegister: function(){
      this.refs.reg.hide();
    },

	render: function(){
		return(
			<div>
			  <h2>Login Here</h2>
			<ul className="form-fields">
			<label>Username</label>
			<input type="text" ref = 'username' defaultValue = {this.props.fieldValues.username}/>
			<br></br>
			<label>Password</label>
			<input type ="password" ref="password" defaultValue={this.props.fieldValues.password}/>
              <p className = "form-footer">
			<FlatButton onClick={this.submitLogin}>Submit</FlatButton>
			<br></br>
			<FlatButton onClick={this.showRegister}>Register</FlatButton>
			  </p>
			  <br></br>
			  <br></br>
			  </ul>
			  <a href='/authorize/google'><img src="../static/img/sign-in-with-google.png"/></a>
			  <br></br>
			  <Modal ref="reg">
                <div>
                <Registration/>
                </div>
              </Modal>
			</div>
			)
	},

	submitLogin: function(e){
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
  		xmlHttp.open( "GET", Url, false);
  		xmlHttp.send( null );
  		var response = xmlHttp.responseText;
  		var result = JSON.parse(response)
  		if (result.status == "ok"){
  			this.props.successStep()
  			window.setTimeout(function(){
  				window.location.href = "http://localhost:5000/#/dash"
  			}, 3000);
  		}
  		else{
  			this.props.failureStep()
  		}
	}
})

export default LoginFields;
