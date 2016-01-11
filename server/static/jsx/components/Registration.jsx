var React         = require('react')
var AccountFields = require('./AccountFields')
var Confirmation  = require('./Confirmation')
var Success       = require('./Success')


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
      return <Success fieldValues={fieldValues}/>                    
  }
},

render: function(){
  var style = {
    width : (this.state.step / 3 * 100) + '%'
  }

  return(
    <main>
      <span className = "progress-step">Step {this.state.step}</span>
      <progress className="progress" style={style}></progress>
      {this.showStep()}
    </main>
    )
}
})

module.exports = Registration