import React from 'react';
import assign from 'object-assign';
import LoginFields from './LoginFields';
import LoginResult from './LoginResult';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';



var fieldValues = {
  username     : null,
  password    : null
}

var Login = React.createClass({
	getInitialState: function(){
		return{
			step: 1
		}
	},

saveValues: function(field_value){
  return function(){
    fieldValues = assign({}, fieldValues, field_value)
  }.bind(this)()
},

nextStep: function(){
  this.setState({
    step: this.state.step + 1
  })
},

previousStep: function(){
  this.setState({
    step: this.state.step - 1
  })
},

submitLogin: function(){
  this.nextStep()
  this.loginUser()
},

loginUser: function(){
  var user_id = fieldValues.username 
  var password = fieldValues.password
  var Url = "http://localhost:5000/api_get/" + user_id + "/" + password;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
},

showStep: function(){
  switch(this.state.step){
    case 1:
      return <LoginFields fieldValues={fieldValues}
                          saveValues ={this.saveValues}
                          submitLogin={this.submitLogin}
                          nextStep={this.nextStep}/>
    case 2:
      return <LoginResult fieldValues={fieldValues}/>
  }
},

render(){
    var cardStyle = {
      display: 'block',
      marginLeft: '270px',
      width: '300px',
      height: '300px',
      paddng: '50px'
             }
  return(
    <Card style={cardStyle}>
    <main>
      {this.showStep()}
    </main>
    </Card>
    );
  }
});

export default Login;