import React from 'react';
import MainAppBar from './app-bar'
import LiftGallery from './lift-gallery'

const Dash = React.createClass({

    getInitialState: function() {
        return {
              lifts:[{
                  img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=650%C3%97643&w=350&h=330',
                  title: '2',
                  author: '2',
                  },
               ]
        };
      },


      handleResponse(data){
          this.setState({lifts: this.state.lifts.concat([data])})
      },


  render() {
    return (
      <div>
        <MainAppBar handleResponse={this.handleResponse}/>
        <LiftGallery lifts={this.state.lifts} />
      </div>
    );
  }
});

export default Dash;
