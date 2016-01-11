import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'
import Colors from 'material-ui/lib/styles/colors';
import MenuItem from 'material-ui/lib/menus/menu-item'

var AccountFields = React.createClass({
	render: function(){
		return(
			<div>
			<label>Username</label>
			<input type="text" ref = 'username' defaultValue = {this.props.fieldValues.name}/>

			<label>Password</label>
			<input type ="password" ref="password" defaultValue={this.proprs.fieldValues.password}/>

			<label>Email</label>
			<input type="email" ref="email" defaultValue={this.props.fieldValues.email}/>

			<button onClick = {this.submit}>Submit!</button>
			</div>
			)
	},

	submit: function(e){
		e.preventDefault()

		//Get values via this.refs
		var data = {
			name	: this.refs.name.getDOMNode().value,
			password: this.refs.name.getDOMNode().value,
			email   : this.refs.name.getDOMNode().value
		}
		this.props.saveValues(data)
	}
})