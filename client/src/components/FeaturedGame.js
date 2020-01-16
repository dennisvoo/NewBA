import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getGames,
  getStandings,
  getTeams,
  getMVPTeams
} from "../actions/nbaActions";
import moment from "moment";

class FeaturedGame extends Component {
  componentDidMount() {
    this.props.getGames();
    this.props.getStandings();
    this.props.getTeams();
    this.props.getMVPTeams();

    this._interval = window.setInterval(this.props.getGames, 10000);
  }

  componentWillUnmount() {
    this._interval && window.clearInterval(this._interval);
  }

  render() {
    const {
      games,
      teams,
      topTeams,
      mvpTeams,
      isAuthenticated,
      user
    } = this.props;
    const today = new Date();
    let featGame;
    // filter the list of games into pregame, playing, and postgame
    const playing = games.filter(game => game.statusNum === 2);
    const pregame = games.filter(game => game.statusNum === 1);
    const postgame = games.filter(game => game.statusNum === 3);

    let isUser = isAuthenticated;
    if (isUser) {
      let searchArr;
      if (playing[0]) {
        searchArr = [...playing];
      } else if (pregame[0]) {
        searchArr = [...pregame];
      } else if (postgame[0]) {
        searchArr = [...postgame];
      }

      if (searchArr) {
        if (user.prefFavTeam) {
          featGame = searchArr.find(
            game =>
              game.hTeam.triCode === user.favTeam ||
              game.vTeam.triCode === user.favTeam
          );
        }

        if (typeof featGame === "undefined" && user.prefMVPs) {
          const mvpGames = searchArr.filter(
            game =>
              mvpTeams.some(team => team.mvpTeam === game.vTeam.triCode) &&
              mvpTeams.some(team => team.mvpTeam === game.hTeam.triCode)
          );

          if (searchArr.toString() !== postgame.toString()) {
            featGame = mvpGames[0];
          } else {
            featGame = mvpGames[mvpGames.length - 1];
          }
        }

        if (typeof featGame === "undefined" && user.prefNatGames) {
          const natGames = searchArr.filter(
            game => game.watch.broadcast.broadcasters.national.length > 0
          );

          if (searchArr.toString() !== postgame.toString()) {
            featGame = natGames[0];
          } else {
            featGame = natGames[natGames.length - 1];
          }
        }

        if (typeof featGame === "undefined" && user.prefTopTeams) {
          const topTeamGames = searchArr.filter(
            game =>
              topTeams.some(team => team.teamId === game.vTeam.teamId) &&
              topTeams.some(team => team.teamId === game.hTeam.teamId)
          );

          if (searchArr.toString() !== postgame.toString()) {
            featGame = topTeamGames[0];
          } else {
            featGame = topTeamGames[topTeamGames.length - 1];
          }
        }

        if (typeof featGame === "undefined") {
          isUser = false;
        }
      } else {
        isUser = false;
      }
    }

    if (!isUser) {
      // Default for displaying games if no user preferences
      if (playing[0]) {
        featGame = playing[0];
      } else if (pregame[0]) {
        featGame = pregame[0];
      } else if (postgame[0]) {
        featGame = postgame[postgame.length - 1];
      } else {
        return null;
      }
    }

    let awayName = "",
      homeName = "";
    if (teams.length && featGame) {
      let away = teams.find(
        team => team.abbreviation === featGame.vTeam.triCode
      );
      let home = teams.find(
        team => team.abbreviation === featGame.hTeam.triCode
      );
      awayName = away.name + " " + away.nickname;
      homeName = home.name + " " + home.nickname;
    }

    return (
      <div id="feat-game">
        <h2>{moment(today).format("MMMM Do, YYYY")}</h2>
        <div className="feat-col">
          <h1>{featGame ? featGame.vTeam.score : null}</h1>
          <h2>{awayName}</h2>
        </div>

        <div className="feat-col">
          <h1>{featGame ? featGame.hTeam.score : null}</h1>
          <h2>{homeName}</h2>
        </div>

        <h2 style={{ clear: "left", bottom: "15px" }}>
          {(() => {
            switch (featGame ? featGame.statusNum : 0) {
              case 1:
                return featGame.startTimeEastern;
              case 2:
                return featGame.period.isHalftime
                  ? "Halftime"
                  : (featGame.period.current > 4
                      ? "OT" +
                        (featGame.period.current > 5
                          ? featGame.period.current - 4
                          : "")
                      : "Q" + featGame.period.current) +
                      " | " +
                      (featGame.period.isEndOfPeriod ? "End" : featGame.clock);
              case 3:
                return (
                  "Final" +
                  (featGame.period.current > 4
                    ? " / OT" +
                      (featGame.period.current > 5
                        ? featGame.period.current - 4
                        : "")
                    : "")
                );
              default:
                return "";
            }
          })()}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.nba.games,
  teams: state.nba.teams,
  topTeams: state.nba.east.slice(0, 8).concat(state.nba.west.slice(0, 8)),
  mvpTeams: state.nba.mvpTeams,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  getGames,
  getStandings,
  getTeams,
  getMVPTeams
})(FeaturedGame);
