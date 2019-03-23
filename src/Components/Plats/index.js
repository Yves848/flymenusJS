import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import widhWidth from "@material-ui/core/withWidth";
import compose from "recompose/compose";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthUserContext } from "../Session";
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Avatar, ListItemText } from "@material-ui/core";
import Progress from "@material-ui/core/CircularProgress";
import Hidden from "@material-ui/core/Hidden";
import AjoutPlat from "./ajoutPlat";
import * as Icons from "../../constants/images";

const INITIAL_PLAT = require("./plat.json");
const drawerWidth = 200;
const styles = theme => ({
  root: {
    display: "flex"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    },
    marginTop: theme.spacing.unit * 8
  },
  content: {
    paddingTop: theme.spacing.unit * 8
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  imgButton: {
    borderColor: "grey",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "5px",
    "&:hover": {
      boxShadow: "2px 2px grey"
    },
    cursor: "pointer",
    width: 24,
    height: 24
  },
  grisList: {
    overflow: "scroll",
    height: "93vh"
  },
  progress: {
    margin: theme.spacing.unit *9

  }
});

class Plats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      plats: [],
      open: false,
      iProgress: 0
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    this.setState({
      loading: true
    });

    const { firebase } = this.props;
    const user = firebase.getUser().user;
    firebase.platsRef(user.uid).on("value", snapshot => {
      const platsObj = snapshot.val();
      const platsList = Object.keys(platsObj).map(key => ({
        ...platsObj[key],
        uid: key
      }));
      this.setState({
        plats: platsList,
        user: user,
        loading: false
      });
    });
  }

  deletePlat = key => {
    const { firebase } = this.props;
    const { user } = this.state;
    firebase
      .platsRef(user.uid)
      .child(key)
      .remove();
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    const drawer = (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })
        }}
        open={this.state.open}
      />
    );
    const plats = this.state.plats.map((plat, index) => {
      return (
        <Grid
          container
          direction="column"
          alignContent="space-between"
          key={index}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              alignContent="flex-start"
              spacing={8}
            >
              <Grid item>
                <img
                  className={classes.imgButton}
                  src={Icons.DeleteIcon}
                  onClick={() => this.deletePlat(plat.uid)}
                />
              </Grid>
              <Grid item>
                <p key={plat.uid}>
                  {plat.Nom} {plat.Categorie} {plat.uid}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });

    return loading ? (
      <div className={classes.content}>
      <Paper className={classes.progress}>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item>
            <h1>Chargement</h1>
            
          </Grid>
          <Grid item>
          <Progress color="primary" />
          </Grid>
        </Grid>
        </Paper>
      </div>
    ) : (
      <div className={classes.content}>
      <AjoutPlat isOpen={this.state.open} handleClose={() => this.handleClose()}></AjoutPlat>
        <Grid
          container
          alignContent="flex-start"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={2} lg={1}>
            <List dense>
              <ListItem button key="Ajout" onClick={() => {this.setState({open:true})}}>
                <img src={Icons.AddIcon} />
                <Hidden xsDown>Ajout</Hidden>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={10} lg={11}>
            <Paper>
              <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
              Plats
              </Grid>
              </Grid>
            </Paper>
            <div className={classes.grisList}>{plats}</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  widhWidth(),
  withStyles(styles)
)(Plats);
