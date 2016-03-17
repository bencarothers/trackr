import React from 'react';
import jQuery from 'jquery';
import MainAppBar from './components/app-bar'
import LiftGallery from './components/lift-gallery'

const Dash = React.createClass({

    getInitialState: function() {
        return {
              lifts:[],
              username: null,
        };
      },
//TODO: In current user query, now send back more than username info.
      componentDidMount: function(){
        jQuery.get("/current_user/").done(function(result){
          var user_id = result.user;
          console.log(user_id);
          var lifts = result.lifts;
          console.log(lifts);
          this.setState({ username: user_id });
          var data = []
          for (var x = 0; x < lifts.length; x++){
            data.push(lifts[x])
          }
          console.log(data)
          this.setState({lifts: data});
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
