import React from 'react';
import Login from './components/login'

const Home = React.createClass({

  render() {
    return (
      <div className="home">
        <Login/>
      </div>
    );
  },
});

export default Home;
