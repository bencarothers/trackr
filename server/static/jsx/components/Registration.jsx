import React from 'react';
import assign from 'object-assign';
import AccountFields from './AccountFields';
import Confirmation  from './Confirmation';
import Success from './Success';
import Card from 'material-ui/lib/card/card';


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

submitRegistration: function(){
  this.nextStep()
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