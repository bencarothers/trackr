import React from 'react';
import jQuery from 'jquery';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
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
        var divStyle = {
            padding: '2em',
            textAlign: 'center'
        }
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
                              <div style={divStyle}>
                               <form>
                                    <div className="form-group row">
                                        <h2 className="col-md-12 text-center">Add a Lift</h2>
                                    </div>
                                    <div className="form-group row">
                                        Lift: <input type="text" ref="lift"></input><br></br>
                                    </div>
                                    <div className="form-group row">
                                        Weight: <input type="text" ref="weight"></input><br></br>
                                    </div>
                                    <div className="form-group row">
                                        <span className="btn btn-default btn-file">
                                            Browse: <input type="file" ref="video" accept="image/*"></input>
                                        </span>
                                    </div>
                                    <div className="form-group row">
                                        <button type='button' className="btn btn-secondary col-md-offset-3 col-md-6"
                                                onClick={this.handleSubmit}>Add
                                        </button>
                                    </div>
                                </form>
                              </div>
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
