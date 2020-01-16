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
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { getTeams } from "../../actions/nbaActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
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
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      this.props.clearErrors();
      this.props.history.push("/");
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

    const {
      name,
      email,
      password,
      favTeam,
      prefFavTeam,
      prefMVPs,
      prefNatGames,
      prefTopTeams
    } = this.state;

    const newUser = {
      name,
      email,
      password,
      favTeam,
      prefFavTeam,
      prefMVPs,
      prefNatGames,
      prefTopTeams
    };

    this.props.register(newUser);
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
              placeholder="Name"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="favTeam">Choose Favorite Team</Label>
            <Input
              type="select"
              name="favTeam"
              id="favTeam"
              onChange={this.onChange}
            >
              <option hidden>Favorite Team</option>
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
            />
            <CustomInput
              type="switch"
              id="prefMVPs"
              name="prefMVPs"
              label="Games Between MVP Candidates"
              onChange={this.onSwitch}
            />
            <CustomInput
              type="switch"
              id="prefNatGames"
              name="prefNatGames"
              label="Nationally Televised Games"
              onChange={this.onSwitch}
            />
            <CustomInput
              type="switch"
              id="prefTopTeams"
              name="prefTopTeams"
              label="Games Between Playoff Teams"
              onChange={this.onSwitch}
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" style={{ marginTop: "2rem" }} block>
              Register
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  teams: state.nba.teams
});

export default connect(mapStateToProps, { register, clearErrors, getTeams })(
  Register
);
