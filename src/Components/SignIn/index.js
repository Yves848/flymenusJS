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
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit 
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width:'300px'
  },
  grid: {
    
  }
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
        this.props.history.push(ROUTES.PLATS);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSignInWithFacebook = () => {
    this.props.firebase.doSignInWithFacebook()
    .then((user) =>{
      this.props.firebase.setUser(user)
      this.props.history.push(ROUTES.PLATS);
    })
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
      <div>
      <Paper className={classes.root} elevation={3}>
        <Grid container direction="column" alignContent="center" className={classes.grid}>
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
                id="outlined-email"
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
                id="outlined-password"
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
      </div>
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
