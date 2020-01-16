import React, { Component } from "react";
import {
  Container,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { update } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { getTeams } from "../../actions/nbaActions";

class Preferences extends Component {
  state = {
    id: "",
    name: "",
    favTeam: "",
    prefFavTeam: false,
    prefMVPs: false,
    prefNatGames: false,
    prefTopTeams: false,
    msg: null
  };

  componentDidMount() {
    this.props.getTeams();
  }

  componentDidUpdate(prevProps) {
    const { user, error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "UPDATE_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (user !== prevProps.user) {
      if (isAuthenticated) {
        this.setState({
          id: user._id,
          name: user.name,
          favTeam: user.favTeam,
          prefFavTeam: user.prefFavTeam,
          prefMVPs: user.prefMVPs,
          prefNatGames: user.prefNatGames,
          prefTopTeams: user.prefTopTeams
        });
      } else {
        this.props.clearErrors();
        this.props.history.push("/");
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSwitch = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props.user;

    const {
      name,
      favTeam,
      prefFavTeam,
      prefMVPs,
      prefNatGames,
      prefTopTeams
    } = this.state;

    const user = {
      id,
      name,
      favTeam,
      prefFavTeam,
      prefMVPs,
      prefNatGames,
      prefTopTeams
    };

    this.props.update(user);
  };

  render() {
    const { teams } = this.props;
    return (
      <Container style={{ width: "500px" }}>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              id="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="favTeam">Choose Favorite Team</Label>
            <Input
              type="select"
              name="favTeam"
              id="favTeam"
              onChange={this.onChange}
              value={this.state.favTeam}
            >
              {teams.map((team, i) => (
                <option key={i} value={team.abbreviation}>
                  {team.name + " " + team.nickname}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="prefSwitches">Set Preferences for Featured Game</Label>
            <CustomInput
              type="switch"
              id="prefFavTeam"
              name="prefFavTeam"
              label="Favorite Team"
              onChange={this.onSwitch}
              checked={this.state.prefFavTeam}
            />
            <CustomInput
              type="switch"
              id="prefMVPs"
              name="prefMVPs"
              label="Games Between MVP Candidates"
              onChange={this.onSwitch}
              checked={this.state.prefMVPs}
            />
            <CustomInput
              type="switch"
              id="prefNatGames"
              name="prefNatGames"
              label="Nationally Televised Games"
              onChange={this.onSwitch}
              checked={this.state.prefNatGames}
            />
            <CustomInput
              type="switch"
              id="prefTopTeams"
              name="prefTopTeams"
              label="Games Between Playoff Teams"
              onChange={this.onSwitch}
              checked={this.state.prefTopTeams}
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" style={{ marginTop: "2rem" }} block>
              Update User
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error,
  teams: state.nba.teams
});

export default connect(mapStateToProps, { update, clearErrors, getTeams })(
  Preferences
);
