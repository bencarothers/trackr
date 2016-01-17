import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

var AccountFields = React.createClass({
	render: function(){
		return(
			<div>
			  <h2>Register for Trackr</h2>
			<ul className="form-fields">
			<label>Username</label>
			<input type="text" ref = 'username' defaultValue = {this.props.fieldValues.username}/>
			<br></br>
			<label>Password</label>
			<input type ="password" ref="password" defaultValue={this.props.fieldValues.password}/>
			<br></br>
			<label>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
			<input type="email" ref="email" defaultValue={this.props.fieldValues.email}/>
              <p className = "form-footer">
            <br></br>
			<FlatButton onClick={this.nextStep}>Submit</FlatButton>
			  </p>
			  </ul>
			  <a href='/authorize/google'><img src="../static/img/sign-in-with-google.png"/></a>
			  <br></br>
			</div>
			)
	},

	nextStep: function(e){
		e.preventDefault()

		var data = {
			username: this.refs.username.value,
			password: this.refs.password.value,
			email   : this.refs.email.value
		}
		this.props.saveValues(data)
		this.props.nextStep()
	}
})

export default AccountFields;