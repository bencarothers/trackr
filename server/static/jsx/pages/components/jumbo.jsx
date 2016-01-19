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

        var styles = {

          btn: {
                padding: '1em 2em',
                outline: 'none',
                fontSize: 16,
                fontWeight: '600',
                background: '#C94E50',
                color: '#FFFFFF',
                border: 'none'
            },

          container: {
                width: '70%',
                height: '40%',
                position:'absolute',
                background: 'beige',
                margin: 'auto'
            }
        }

        return (
          <div styles={styles.container}>
            <div >
            <FlatButton onClick={this.showModal}>Open</FlatButton>
               <Modal ref="modal">
                   <form>
                     Lift: <input type="text" name="firstname"></input><br></br>
                     Weight: <input type="text" name="lastname"></input><br></br>
                     Video: <input type="text" name="lastname"></input><br></br><br></br>
                   </form>
                 <FlatButton onClick={this.hideModal}>Add a Lift</FlatButton>
               </Modal>
            </div>
          </div>
       );
    },
});

export default Jumbo;
