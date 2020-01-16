import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
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

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.props.login(user);
  };

  render() {
    return (
      <Container style={{ width: "500px" }}>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
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
            <Button color="primary" style={{ marginTop: "2rem" }} block>
              Login
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
