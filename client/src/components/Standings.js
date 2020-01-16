import React, { Component } from "react";
import { connect } from "react-redux";
import { getStandings } from "../actions/nbaActions";

import { Table } from "reactstrap";

class Standings extends Component {
  componentDidMount() {
    this.props.getStandings();
  }

  render() {
    const { east, west } = this.props;

    return (
      <div className="tables">
        <h1>Eastern Conference</h1>
        <Table hover size="sm">
          <thead>
            <tr>
              <th style={{ width: "300px" }}></th>
              <th>W</th>
              <th>L</th>
              <th>W%</th>
              <th>GB</th>
              <th>HOME</th>
              <th>AWAY</th>
              <th>CONF</th>
              <th>DIV</th>
              <th>STRK</th>
              <th>L10</th>
            </tr>
          </thead>
          <tbody>
            {east.map((team, i) => (
              <tr key={i}>
                <td>
                  {team.confRank} {team.teamSitesOnly.teamName}{" "}
                  {team.teamSitesOnly.teamNickname}
                </td>
                <td>{team.win}</td>
                <td>{team.loss}</td>
                <td>{team.winPct}</td>
                <td>{team.gamesBehind}</td>
                <td>
                  {team.homeWin}-{team.homeLoss}
                </td>
                <td>
                  {team.awayWin}-{team.awayLoss}
                </td>
                <td>
                  {team.confWin}-{team.confLoss}
                </td>
                <td>
                  {team.divWin}-{team.divLoss}
                </td>
                <td>
                  {team.isWinStreak ? "W" + team.streak : "L" + team.streak}
                </td>
                <td>
                  {team.lastTenWin}-{team.lastTenLoss}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h1>Western Conference</h1>
        <Table hover size="sm">
          <thead>
            <tr>
              <th style={{ width: "300px" }}></th>
              <th>W</th>
              <th>L</th>
              <th>W%</th>
              <th>GB</th>
              <th>HOME</th>
              <th>AWAY</th>
              <th>CONF</th>
              <th>DIV</th>
              <th>STRK</th>
              <th>L10</th>
            </tr>
          </thead>
          <tbody>
            {west.map((team, i) => (
              <tr key={i}>
                <td>
                  {team.confRank} {team.teamSitesOnly.teamName}{" "}
                  {team.teamSitesOnly.teamNickname}
                </td>
                <td>{team.win}</td>
                <td>{team.loss}</td>
                <td>{team.winPct}</td>
                <td>{team.gamesBehind}</td>
                <td>
                  {team.homeWin}-{team.homeLoss}
                </td>
                <td>
                  {team.awayWin}-{team.awayLoss}
                </td>
                <td>
                  {team.confWin}-{team.confLoss}
                </td>
                <td>
                  {team.divWin}-{team.divLoss}
                </td>
                <td>
                  {team.isWinStreak ? "W" + team.streak : "L" + team.streak}
                </td>
                <td>
                  {team.lastTenWin}-{team.lastTenLoss}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  east: state.nba.east,
  west: state.nba.west
});

export default connect(mapStateToProps, { getStandings })(Standings);
