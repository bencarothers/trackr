define([
    'react',
], function(React) {
var App = React.createClass({
  incrementCount() {
    this.setState({
      count: this.state.count + 1
    })
  },
  getInitialState() {
    return {
      count: 0
    }
  },
  render() {
    return <div className="my-component">
      <h1>Count: {this.state.count}</h1>
      <button type="button" onClick={this.incrementCount}>Increment </button>
    </div> 
  }
  })
  return App;
})
