import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class Game extends Component {
  render() {
    const { game } = this.props;
    const away = game.vTeam;
    const home = game.hTeam;
    const status = game.statusNum;
    const teams = this.props.teams;

    let awayName = "",
      homeName = "";
    if (teams.length) {
      let away = teams.find(team => team.abbreviation === game.vTeam.triCode);
      let home = teams.find(team => team.abbreviation === game.hTeam.triCode);
      awayName = away.name + " " + away.nickname;
      homeName = home.name + " " + home.nickname;
    }

    return (
      <div className="game">
        <div className="game-row">
          <span>
            {(() => {
              switch (status) {
                case 1:
                  return game.startTimeEastern;
                case 2:
                  return game.period.isHalftime
                    ? "Halftime"
                    : (game.period.current > 4
                        ? "OT" +
                          (game.period.current > 5
                            ? game.period.current - 4
                            : "")
                        : "Q" + game.period.current) +
                        " | " +
                        (game.period.isEndOfPeriod ? "End" : game.clock);
                case 3:
                  return (
                    "Final" +
                    (game.period.current > 4
                      ? " / OT" +
                        (game.period.current > 5 ? game.period.current - 4 : "")
                      : "")
                  );
                default:
                  return "";
              }
            })()}
          </span>

          <h5>
            {game.watch.broadcast.broadcasters.national[0]
              ? game.watch.broadcast.broadcasters.national[0].longName
              : null}
          </h5>
        </div>

        <div className="score-info">
          <div className="team-col">
            <div className="game-half">
              <span>
                {awayName} ({away.win}-{away.loss})
              </span>
            </div>
            <div className="game-half">
              <span>
                {homeName} ({home.win}-{home.loss})
              </span>
            </div>
          </div>

          <div className="score-col">
            <div className="game-half">
              <span>{away.score}</span>
            </div>
            <div className="game-half">
              <span>{home.score}</span>
            </div>
          </div>
        </div>

        <div className="game-row" style={{ backgroundColor: "whitesmoke" }}>
          <small>{game.nugget.text}</small>
        </div>

        <div className="game-row">
          <Link
            to={{
              pathname: "/boxscore/",
              search: `?date=${game.startDateEastern}&gameId=${game.gameId}`,
              state: {
                awayName,
                homeName
              }
            }}
          >
            <Button
              outline
              color="primary"
              size="sm"
              disabled={home.score === ""}
            >
              Box Score
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Game;
