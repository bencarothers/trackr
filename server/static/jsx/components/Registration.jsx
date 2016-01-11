
var fieldValues = {
  username     : null,
  email    : null,
  password : null
}

var React         = require('react')
var AccountFields = require('./AccountFields')
var Confirmation  = require('./Cofnrimation')
var Success       = require('./Success')

var Registration = React.createClass({
	getInitialState: function(){
		return{
			step: 1
		}
	}
  },

  render: function(){
  	switch(this.state.step){
  		case 1:
  		    return<AccountFields/>
  		case 2:
  		    return<Success/>
  		}

  	}
  }
  module.exports = Registration

saveValues: function(fields){
  return function(){
    fieldValues = object.assign({}, fieldValues, fields)
  }()
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

render: function(){
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
      return <Success fieldValues={fieldValues}/>                    
  }
}
