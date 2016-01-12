import React from 'react';
import assign from 'object-assign';
import AccountFields from './AccountFields';
import Confirmation  from './Confirmation';
import Success from './Success';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import CardMedia from 'material-ui/lib/card/card-media';



var fieldValues = {
  username     : null,
  email    : null
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

submitRegistration: function(){
  this.nextStep()
  this.registerUser()
},

registerUser: function(){
  var user_id = fieldValues.username 
  var email = fieldValues.email
  var password = fieldValues.password
  var Url = "http://localhost:5000/api_post/" + user_id + "/" + password + "/" + email;
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
      return <Success fieldValues={fieldValues} />                    
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

export default Registration;