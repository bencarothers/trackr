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
                <div>Loading...</div>
             );
           }
      }
});

export default Dash;
