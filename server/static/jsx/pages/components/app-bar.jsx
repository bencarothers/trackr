import React from 'react';
import jQuery from 'jquery';
import Modal from 'boron/OutlineModal'

const MainAppBar = React.createClass({

    addLift(){
        this.refs.modal.show();
    },

    handleSubmit(){
        var fd = new FormData()
        fd.append( 'file', this.refs.file.files[0] );
        this.props.handleResponse(fd)
        console.log()
        jQuery.ajax({
            url: '/ajaxVideoUpload/' + this.refs.lift.value + '/' + this.refs.weight.value + '/' + moment().format('MMMDoYY') + '/' ,
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                location.reload();
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
            background: 'lightgrey',
            padding: '2em',
            textAlign: 'center'
        }
        const title = 'Trackr'
        return (
            <div >
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand brand-image" href="#" data-step="3"
                               data-intro="We'll handle the rest.">
                                <img alt="Brand" src="./static/img/bar.png"></img>
                            </a>
                            <div className="navbar-brand">
                                <p>Trackr</p>
                            </div>
                        </div>
                        <btn className="btn btn-success navbar-btn pull-right margin-right" onClick={this.addLift}
                             data-step="1" data-intro="Click here to add a lift!">Add
                        </btn>
                        <btn className="btn btn-warning navbar-btn pull-right margin-right" onClick={this.logOut}>
                            Logout
                        </btn>
                        <btn className="btn btn-info navbar-btn pull-right margin-right" onClick={this.intro}>Help?
                        </btn>

                        <Modal ref="modal">
                            <div style={divStyle}>
                                <form className="form-horizontal" role="form">
                                    <div className="form-group row text-center">
                                        <img id='biceps' src='../static/img/Flex.png'></img>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label"
                                               htmlFor="lift">Lift</label>
                                        <div className="col-sm-10">
                                            <input ref='lift' className="form-control"
                                                   id="lift" placeholder="Lift"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label"
                                               htmlFor="weight">Weight</label>
                                        <div className="col-sm-10">
                                            <input ref='weight' className="form-control"
                                                   id="weight" placeholder="Weight"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label"
                                               htmlFor="weight">Weight</label>
                                        <input ref='file' id="file" type="file" className="btn-file"></input>
                                    </div>
                                    <div className="form-group row">
                                        <button type='button' className="btn btn-success col-md-offset-3 col-md-6"
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
