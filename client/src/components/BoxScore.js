import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import { Table } from "reactstrap";

const proxyurl = "https://cors-proxy-dv.herokuapp.com/";
const url = "http://data.nba.net/prod/v1/";

class BoxScore extends Component {
  state = {
    gameData: [],
    stats: [],
    success: false
  };

  grabBoxScore = () => {
    const params = queryString.parse(this.props.location.search);
    axios
      .get(
        proxyurl + url + params.date + "/" + params.gameId + "_boxscore.json"
      )
      .then(({ data }) => {
        this.setState({
          gameData: data.basicGameData,
          stats: data.stats,
          success: true
        });
      });
  };

  componentDidMount() {
    this.grabBoxScore();

    this._interval = window.setInterval(this.grabBoxScore, 10000);
  }

  componentWillUnmount() {
    this._interval && window.clearInterval(this._interval);
  }

  render() {
    if (this.state.success) {
      const game = this.state.gameData;
      const status = game.statusNum;
      const away = game.vTeam;
      const home = game.hTeam;
      const awayStats = this.state.stats.vTeam.totals;
      const homeStats = this.state.stats.hTeam.totals;

      let awayCount = 5;
      let pos = this.state.stats.activePlayers[5].pos;
      while (pos === "") {
        awayCount++;
        pos = this.state.stats.activePlayers[awayCount].pos;
      }

      const awayPlayers = this.state.stats.activePlayers.slice(0, awayCount);
      const homePlayers = this.state.stats.activePlayers.slice(awayCount);

      let awayOT = 0,
        homeOT = 0;
      let count = 4;
      while (away.linescore[count]) {
        awayOT += Number(away.linescore[count].score);
        homeOT += Number(home.linescore[count].score);
        count++;
      }

      return (
        <div>
          <div id="box-score-header">
            <div className="box-score-team">
              <h4>{this.props.location.state.awayName}</h4>
              <h3>{away.score}</h3>
              <span>
                {away.win}-{away.loss}, (
                {away.seriesWin === ""
                  ? "0-0"
                  : away.seriesWin + "-" + away.seriesLoss}
                )
              </span>
            </div>

            <div id="linescore">
              <h5>
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
                            (game.period.current > 5
                              ? game.period.current - 4
                              : "")
                          : "")
                      );
                    default:
                      return "";
                  }
                })()}
              </h5>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>
                      {game.watch.broadcast.broadcasters.national[0]
                        ? game.watch.broadcast.broadcasters.national[0].longName
                        : ""}
                    </th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    {away.linescore[4] ? <th>OT</th> : null}
                    <th>T</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{away.triCode}</th>
                    <td>{away.linescore[0] ? away.linescore[0].score : 0}</td>
                    <td>{away.linescore[1] ? away.linescore[1].score : 0}</td>
                    <td>{away.linescore[2] ? away.linescore[2].score : 0}</td>
                    <td>{away.linescore[3] ? away.linescore[3].score : 0}</td>
                    {away.linescore[4] ? <td>{awayOT}</td> : null}
                    <th>{away.score}</th>
                  </tr>
                  <tr>
                    <th>{home.triCode}</th>
                    <td>{home.linescore[0] ? home.linescore[0].score : 0}</td>
                    <td>{home.linescore[1] ? home.linescore[1].score : 0}</td>
                    <td>{home.linescore[2] ? home.linescore[2].score : 0}</td>
                    <td>{home.linescore[3] ? home.linescore[3].score : 0}</td>
                    {home.linescore[4] ? <td>{homeOT}</td> : null}
                    <th>{home.score}</th>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className="box-score-team">
              <h4>{this.props.location.state.homeName}</h4>
              <h3>{home.score}</h3>
              <span>
                {home.win}-{home.loss}, (
                {home.seriesWin === ""
                  ? "0-0"
                  : home.seriesWin + "-" + home.seriesLoss}
                )
              </span>
            </div>
          </div>

          <div style={{ width: "92.5%", margin: "auto" }}>
            <h5>{this.props.location.state.awayName}</h5>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th style={{ width: "250px" }}></th>
                  <th>MIN</th>
                  <th>PTS</th>
                  <th>FG</th>
                  <th>FG%</th>
                  <th>3PT</th>
                  <th>3PT%</th>
                  <th>FT</th>
                  <th>FT%</th>
                  <th>OREB</th>
                  <th>DREB</th>
                  <th>REB</th>
                  <th>AST</th>
                  <th>STL</th>
                  <th>BLK</th>
                  <th>TO</th>
                  <th>PF</th>
                  <th>+/-</th>
                </tr>
              </thead>
              <tbody>
                {awayPlayers.map((player, i) => (
                  <tr key={i}>
                    <td>
                      {player.firstName} {player.lastName} {player.pos}
                    </td>
                    <td>{player.min}</td>
                    <td>{player.points}</td>
                    <td>
                      {player.dnp === "" ? player.fgm + "-" + player.fga : ""}
                    </td>
                    <td>{player.fgp}</td>
                    <td>
                      {player.dnp === "" ? player.tpm + "-" + player.tpa : ""}
                    </td>
                    <td>{player.tpp}</td>
                    <td>
                      {player.dnp === "" ? player.ftm + "-" + player.fta : ""}
                    </td>
                    <td>{player.ftp}</td>
                    <td>{player.offReb}</td>
                    <td>{player.defReb}</td>
                    <td>{player.totReb}</td>
                    <td>{player.assists}</td>
                    <td>{player.steals}</td>
                    <td>{player.blocks}</td>
                    <td>{player.turnovers}</td>
                    <td>{player.pFouls}</td>
                    <td>{player.plusMinus}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td>{awayStats.min}</td>
                  <td>{awayStats.points}</td>
                  <td>
                    {awayStats.fgm}-{awayStats.fga}
                  </td>
                  <td>{awayStats.fgp}</td>
                  <td>
                    {awayStats.tpm}-{awayStats.tpa}
                  </td>
                  <td>{awayStats.tpp}</td>
                  <td>
                    {awayStats.ftm}-{awayStats.fta}
                  </td>
                  <td>{awayStats.ftp}</td>
                  <td>{awayStats.offReb}</td>
                  <td>{awayStats.defReb}</td>
                  <td>{awayStats.totReb}</td>
                  <td>{awayStats.assists}</td>
                  <td>{awayStats.steals}</td>
                  <td>{awayStats.blocks}</td>
                  <td>{awayStats.turnovers}</td>
                  <td>{awayStats.pFouls}</td>
                  <td>{awayStats.plusMinus}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div style={{ width: "92.5%", margin: "auto" }}>
            <h5>{this.props.location.state.homeName}</h5>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th style={{ width: "250px" }}></th>
                  <th>MIN</th>
                  <th>PTS</th>
                  <th>FG</th>
                  <th>FG%</th>
                  <th>3PT</th>
                  <th>3PT%</th>
                  <th>FT</th>
                  <th>FT%</th>
                  <th>OREB</th>
                  <th>DREB</th>
                  <th>REB</th>
                  <th>AST</th>
                  <th>STL</th>
                  <th>BLK</th>
                  <th>TO</th>
                  <th>PF</th>
                  <th>+/-</th>
                </tr>
              </thead>
              <tbody>
                {homePlayers.map((player, i) => (
                  <tr key={i}>
                    <td>
                      {player.firstName} {player.lastName} {player.pos}
                    </td>
                    <td>{player.min}</td>
                    <td>{player.points}</td>
                    <td>
                      {player.dnp === "" ? player.fgm + "-" + player.fga : ""}
                    </td>
                    <td>{player.fgp}</td>
                    <td>
                      {player.dnp === "" ? player.tpm + "-" + player.tpa : ""}
                    </td>
                    <td>{player.tpp}</td>
                    <td>
                      {player.dnp === "" ? player.ftm + "-" + player.fta : ""}
                    </td>
                    <td>{player.ftp}</td>
                    <td>{player.offReb}</td>
                    <td>{player.defReb}</td>
                    <td>{player.totReb}</td>
                    <td>{player.assists}</td>
                    <td>{player.steals}</td>
                    <td>{player.blocks}</td>
                    <td>{player.turnovers}</td>
                    <td>{player.pFouls}</td>
                    <td>{player.plusMinus}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td>{homeStats.min}</td>
                  <td>{homeStats.points}</td>
                  <td>
                    {homeStats.fgm}-{homeStats.fga}
                  </td>
                  <td>{homeStats.fgp}</td>
                  <td>
                    {homeStats.tpm}-{homeStats.tpa}
                  </td>
                  <td>{homeStats.tpp}</td>
                  <td>
                    {homeStats.ftm}-{homeStats.fta}
                  </td>
                  <td>{homeStats.ftp}</td>
                  <td>{homeStats.offReb}</td>
                  <td>{homeStats.defReb}</td>
                  <td>{homeStats.totReb}</td>
                  <td>{homeStats.assists}</td>
                  <td>{homeStats.steals}</td>
                  <td>{homeStats.blocks}</td>
                  <td>{homeStats.turnovers}</td>
                  <td>{homeStats.pFouls}</td>
                  <td>{homeStats.plusMinus}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      );
    } else {
      return <h1 style={{ textAlign: "center" }}>Game Not Found</h1>;
    }
  }
}

export default BoxScore;
