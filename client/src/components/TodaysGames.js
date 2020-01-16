import React, { Component } from "react";
import Game from "./Game";
import { connect } from "react-redux";
import { getGames, getTeams } from "../actions/nbaActions";

class TodaysGames extends Component {
  componentDidMount() {
    this.props.getGames();
    this.props.getTeams();

    this._interval = window.setInterval(this.props.getGames, 10000);
  }

  componentWillUnmount() {
    this._interval && window.clearInterval(this._interval);
  }

  render() {
    const { games, teams } = this.props;

    return (
      <div id="games-layout">
        {games &&
          games.map(game => {
            return <Game game={game} teams={teams} key={game.gameId} />;
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.nba.games,
  teams: state.nba.teams
});

export default connect(mapStateToProps, { getGames, getTeams })(TodaysGames);
