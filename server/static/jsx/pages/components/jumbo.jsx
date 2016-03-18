import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin"
import Modal from 'boron/OutlineModal'

const Jumbo = React.createClass({

  showModal(){
    this.refs.modal.show();
  },

  hideModal(){
    this.refs.modal.hide();
  },

  render() {
    var jumboStyle = {
      marginTop: '10%'
    }

    return (
      <div className="container">
        <div className="jumbotron" style={jumboStyle}>
          <h1>Hello, world!</h1>
          <p> Welcome to Trackr.</p>
          <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
        </div>
      </div>
    );
  }
});

export default Jumbo;
