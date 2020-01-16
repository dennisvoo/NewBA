import React, { Component } from 'react';
import FeaturedGame from './FeaturedGame';
import TodaysGames from './TodaysGames';

class HomePage extends Component {
  render() {
    return(
      <div>
        <FeaturedGame/>
        <TodaysGames/>
      </div>
    )
  }
}

export default HomePage;