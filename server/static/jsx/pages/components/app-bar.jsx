import React from 'react';
import jQuery from 'jquery';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from "react-tap-event-plugin"
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Modal from 'boron/OutlineModal'

const MainAppBar = React.createClass({

    addLift(){
        this.refs.modal.show();
    },

    handleSubmit(){
        var formData = {
            lift: React.findDOMNode(this.refs.lift).value,
            weight: React.findDOMNode(this.refs.weight).value,
            video: React.findDOMNode(this.refs.video).value
        };
        this.props.handleResponse(formData)
        jQuery.ajax({
            url: '/ajaxVideoUpload/' + formData.lift + '/' + formData.weight + '/',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            success: function (data) {
                alert('Success');
            }
        })
        this.refs.modal.hide();
    },

    logOut(){
        jQuery.get("/logout_current_user/").done(function (result) {
            window.setTimeout(function () {
                window.location.href = "/"
            }, 1000);
        });
    },

    render() {
        const title = 'Trackr'
        return (
            <div >
                <AppBar
                    title={title}
                    zDepth={0}
                    iconElementRight={
                    <div>
                        <FlatButton onClick={this.addLift}>Add</FlatButton>
                        &nbsp;&nbsp;&nbsp;
                        <FlatButton onClick={this.logOut}>Logout</FlatButton>
                          <Modal ref="modal">
                              <form action="">
                                 Lift: <input type="text" ref="lift"></input><br></br>
                                 Weight: <input type="text" ref="weight"></input><br></br>
                                 Video:<input type="file" ref="video" accept="image/*"></input>
                              </form>
                              <FlatButton onClick={this.handleSubmit} >Add a Lift</FlatButton>
                          </Modal>
                     </div>
              }
                >
                </AppBar>
            </div>
        );
    },
});

export default MainAppBar;
