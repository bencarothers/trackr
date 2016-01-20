import React from 'react';
import assign from 'object-assign';
import AccountFields from './account-fields';
import Confirmation  from './confirmation';
import Success from './success';
import Failure from './failure';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';

var fieldValues = {
  username     : null,
  email    : null,
  password : null
}

var Registration = React.createClass({
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

successStep: function(){
  this.setState({
    step: 4
  })
},

failureStep: function(){
  this.setState({
    step: 3
  })
},

submitRegistration: function(){
  var user_id = fieldValues.username 
  var email = fieldValues.email
  var Url = "http://localhost:5000/api_check/" + user_id + "/" + email;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, false);
  xmlHttp.send( null );
  var response = xmlHttp.responseText;
  var result = JSON.parse(response)
  console.log(response)
  if (result.status == "ok"){
    this.successStep()
    this.registerUser()
  }
  else{
    this.failureStep()
    }
},

registerUser: function(){
  var user_id = fieldValues.username 
  var email = fieldValues.email
  var password = fieldValues.password
  var Url = "http://localhost:5000/api_post/" + user_id + "/" + password + "/" + email + "/";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", Url, true );
  xmlHttp.send( null );
},

showStep: function(){
  switch(this.state.step){
    case 1:
      return <AccountFields fieldValues={fieldValues}
                          nextStep={this.nextStep}
                          saveValues ={this.saveValues} />
    case 2:
      return <Confirmation fieldValues={fieldValues}
                           previousStep={this.previousStep}
                           submitRegistration={this.submitRegistration}/>
    case 3:
      return <Failure fieldValues={fieldValues} 
                      previousStep={this.previousStep} />   
    case 4:
      return <Success fieldValues={fieldValues} />

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
      background: '#C94E50',
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

export default Registration;