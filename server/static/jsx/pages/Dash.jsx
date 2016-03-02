import React from 'react';
import jQuery from 'jquery';
import MainAppBar from './components/app-bar'
import LiftGallery from './components/lift-gallery'

const Dash = React.createClass({

    getInitialState: function() {
        return {
              lifts:[{
                  img: 'path to access display img',
                  lift: '',
                  weight: '',
                  link: 'path to use as the call to aws to view the tracked img' 
                  }],
              username: null,
        };
      },
//TODO: In current user query, now send back more than username info.
      componentDidMount: function(){
        jQuery.get("/current_user/").done(function(result){
          var user_id = result.user;
          this.setState({ username: user_id });
        }.bind(this));
        },

          handleResponse(data){
              this.setState({lifts: this.state.lifts.concat([data])})
          },


      render() {
        var loadStyle = {
          width: '100%'
        };

        if(this.state.username){
          return (
          <div className="dash">
            <MainAppBar handleResponse={this.handleResponse}/>
            <LiftGallery lifts={this.state.lifts} />
          </div>
          );
        }
        else{
             return(
                 <div className="container">
                     <div className="row">
                         <h3>Loading data... Please wait.</h3>
                         <div className="progress progress-striped active page-progress-bar">
                             <div className="progress-bar" style={loadStyle}></div>
                         </div>
                     </div>
                 </div>
             );
           }
      }
});

export default Dash;
