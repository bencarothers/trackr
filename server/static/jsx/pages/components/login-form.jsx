import React from 'react';
import assign from 'object-assign';
import LoginFields from './login-fields';
import LoginSuccess from './login-success';
import LoginFailure from './login-failure';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';


var fieldValues = {
  username     : null,
  password    : null
}

var Login_Form = React.createClass({
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

successStep: function(){
  this.setState({
    step: 3
  })
},

failureStep: function(){
  this.setState({
    step: 2
  })
},

previousStep: function(){
  this.setState({
    step: 1
  })
},

submitLogin: function(){
  //Logic here to determine which step to go to, (SUCCESS step or FAILURE step)
  this.loginUser()
},

loginUser: function(){
  console.log("Function ran in parent")
  var user_id = fieldValues.username 
  var password = fieldValues.password
  var Url = "http://localhost:5000/api_get/" + user_id + "/" + password;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
  var result = xmlHttp.responseText;
  var result = JSON.parse(response)
  console.log(response)
  if (result.status == 'ok'){
    this.successStep()
  }
  else{
    this.failureStep()
  }
},

  showRegister: function(){
    console.log("really tryna show this modal in parent")
      this.refs.reg.show();
    },

    hideRegister: function(){
      this.refs.reg.hide();
    },

showStep: function(){
  switch(this.state.step){
    case 1:
      return <LoginFields fieldValues={fieldValues}
                          saveValues ={this.saveValues}
                          submitLogin={this.submitLogin}
                          successStep={this.successStep}
                          failureStep={this.failureStep}
                          showRegister={this.showRegister}
                          hideRegister={this.hideRegister}/>
    case 2:
      return <LoginFailure
                          previousStep={this.previousStep}/>
    case 3:
      return <LoginSuccess fieldValues={fieldValues}/>
  }
},

render(){
    var cardStyle = {
      display: 'block',
      width: '500px',
      height: '300px',
      paddng: '50px',
      padding: '1em 2em',
      outline: 'none',
      fontSize: 14,
      fontWeight: '600',
      background: '#0099ff',
      color: '#080808'
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

export default Login_Form;
