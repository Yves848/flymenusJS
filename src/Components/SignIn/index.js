import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '35vw'
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {}
});

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = () => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSignInWithFacebook = () => {
    this.props.firebase.doSignInWithFacebook();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { email, password, error } = this.state;
    const { classes } = this.props;
    const isInvalid = password === "" || email === "";

    return (
      <Paper className={classes.root}>
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <Button
              onClick={this.onSignInWithFacebook}
              variant="outlined"
              color="primary"
            >
              S'identifier avec Facebook
            </Button>
          </Grid>
        </Grid>
        <hr />
        <form onSubmit={this.onSubmit}>
          <Grid container direction="column" alignContent="center">
            <Grid item xs>
              <TextField
                id="outlined-name"
                label="email"
                className={classes.textField}
                value={email}
                onChange={this.handleChange("email")}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="outlined-name"
                label="Mot de passe"
                className={classes.textField}
                value={password}
                type="password"
                onChange={this.handleChange("password")}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <Button
                disabled={isInvalid}
                fullWidth
                variant="contained"
                color="secondary"
                onClick={this.onSubmit}
              >
                Connexion
              </Button>
            </Grid>

            {error && <p>{error.message}</p>}
          </Grid>
        </form>
      </Paper>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
