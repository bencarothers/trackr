import React from 'react';

var LoginFields = React.createClass({
	render: function(){
		return(
			<div>
			  <h2>Login Here</h2>
			<ul className="form-fields">
			<label>Username</label>
			<input type="text" ref = 'username' defaultValue = {this.props.fieldValues.username}/>
			<label>Password</label>
			<input type ="password" ref="password" defaultValue={this.props.fieldValues.password}/>
              <p className = "form-footer">
			<button className = "btn -primary pull-right" onClick={this.submitLogin}>Login</button>
			  </p>
			  </ul>
			  <a href='/authorize/google'><img src="../static/img/sign-in-with-google.png"/></a>
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

  		console.log(response)
  		if (result.status == "ok"){
  			this.props.successStep()
  		}
  		else{
  			this.props.failureStep()
  		}
	}
})

export default LoginFields;