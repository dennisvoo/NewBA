import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams } from "../actions/nbaActions";

import { Table } from "reactstrap";

class Teams extends Component {
  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    const { teams } = this.props;

    return (
      <div className="tables">
        <h1>NBA Teams</h1>
        <Table hover bordered size="sm">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>PPG</th>
              <th>OPPG</th>
              <th>DIFF</th>
              <th>FG%</th>
              <th>3P%</th>
              <th>FT%</th>
              <th>OREB</th>
              <th>DREB</th>
              <th>REB</th>
              <th>AST</th>
              <th>TO</th>
              <th>STL</th>
              <th>BLK</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team, i) => (
              <tr key={i}>
                <td>
                  {team.name} {team.nickname}
                </td>
                <td>{team.ppg.avg}</td>
                <td>{team.oppg.avg}</td>
                <td>{team.eff.avg}</td>
                <td>{team.fgp.avg}</td>
                <td>{team.tpp.avg}</td>
                <td>{team.ftp.avg}</td>
                <td>{team.orpg.avg}</td>
                <td>{team.drpg.avg}</td>
                <td>{team.trpg.avg}</td>
                <td>{team.apg.avg}</td>
                <td>{team.tpg.avg}</td>
                <td>{team.spg.avg}</td>
                <td>{team.bpg.avg}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.nba.teams
});

export default connect(mapStateToProps, { getTeams })(Teams);
