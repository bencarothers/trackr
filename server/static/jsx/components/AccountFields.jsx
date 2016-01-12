import React from 'react';

var AccountFields = React.createClass({
	render: function(){
		return(
			<div>
			  <h2>Account Details</h2>
			<ul className="form-fields">
			  <li>
			<label>Username</label>
			<input type="text" ref = 'username' defaultValue = {this.props.fieldValues.name}/>
              </li>
              <li>
			<label>Password</label>
			<input type ="password" ref="password" defaultValue={this.props.fieldValues.password}/>
              </li>
              <li>
			<label>Email</label>
			<input type="email" ref="email" defaultValue={this.props.fieldValues.email}/>
              </li>
              <li className = "form-footer">
			<button className = "btn -primary pull-right" onClick={this.nextStep}>Save &amp; Continue</button>
			  </li>
			  </ul>
			</div>
			)
	},

	nextStep: function(e){
		e.preventDefault()

		//Get values via this.refs
		var data = {
			name	: this.refs.name.getDOMNode().value,
			password: this.refs.name.getDOMNode().value,
			email   : this.refs.name.getDOMNode().value
		}
		this.props.saveValues(data)
		this.props.nextStep()
	}
})

export default AccountFields;