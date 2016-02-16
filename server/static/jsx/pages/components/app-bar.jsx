import React from 'react';
import jQuery from 'jquery';
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

    intro(){
      introJs().start();
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
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand brand-image" href="#" data-step="3" data-intro="We'll handle the rest.">
                                <img alt="Brand" src="./static/img/bar.png"></img>
                            </a>
                            <div className="navbar-brand">
                                <p>Trackr</p>
                            </div>
                        </div>
                        <btn className="btn btn-success navbar-btn pull-right margin-right" onClick={this.addLift}data-step="1" data-intro="Click here to add a lift!">Add</btn>
                        <btn className="btn btn-warning navbar-btn pull-right margin-right" onClick={this.logOut}>Logout</btn>
                        <btn className="btn btn-info navbar-btn pull-right margin-right" onClick={this.intro}>Help?</btn>

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
                </nav>
            </div>
        );
    },
});

export default MainAppBar;
