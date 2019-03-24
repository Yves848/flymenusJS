import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import compose from "recompose/compose";
import { withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Tooltip from "@material-ui/core/Tooltip";
import * as Icons from "../../constants/images";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    zIndex: theme.zIndex.drawer+1
  }

});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.NavigationAuth = firebase => (
      <div>
        <Tooltip title="Home">
          <Button component={Link} to={ROUTES.LANDING} size="small">
            <img src={Icons.HomeIcon} alt="Home"/>
          </Button>
        </Tooltip>
    
        <Tooltip title="Plats">
          <Button component={Link} to={ROUTES.PLATS} size="small">
            <img src={Icons.PlatIcon} alt="Plats"/>
          </Button>
        </Tooltip>
        <Tooltip title="Menus">
          <Button component={Link} to={ROUTES.ACCOUNT} size="small">
            <img src={Icons.MenuIcon} alt="Menus"/>
          </Button>
        </Tooltip>
        <Tooltip title="Déconnection">
          <Button onClick={() => this.doSignOut()} size="small">
            <img src={Icons.ConnectIcon} alt="" />
          </Button>
        </Tooltip>
      </div>
    );
  }

  doSignOut= () => {
    const {firebase} = this.props;
    firebase.doSignOut();
    this.props.history.push(ROUTES.LANDING)
  }

  doSwitchRtl = () => {
    this.props.firebase.switchRtl();
    this.forceUpdate();
  }

  render() {
    const { classes, firebase } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div dir={firebase.direction}>
            <div className={classes.root}>
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <img src={Icons.SiteIcon} alt="FlyMenus" onClick={() => this.doSwitchRtl()}></img>
                  <Hidden smDown>
                    <Typography
                      variant="h6"
                      color="inherit"
                      className={classes.grow}
                    >
                      FlyMenus
                    </Typography>
                  </Hidden>
                  <Hidden smUp>
                    <Typography
                      variant="h6"
                      color="inherit"
                      className={classes.grow}
                    >
                      
                    </Typography>
                  </Hidden>
                  
                  {authUser
                    ? this.NavigationAuth(this.props.firebase)
                    : NavigationNonAuth()}
                </Toolbar>
              </AppBar>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}



const NavigationNonAuth = () => (
  <div>
    <Tooltip title="Home">
      <Button component={Link} to={ROUTES.LANDING} size="small">
        <img src={Icons.HomeIcon} alt="Home"/>
      </Button>
    </Tooltip>

    <Tooltip title="Connection">
      <Button component={Link} to={ROUTES.SIGN_IN} size="small">
        <img src={Icons.ConnectIcon} alt="Login" />
      </Button>
    </Tooltip>
  </div>
);

export default compose(
  withFirebase,
  withRouter,
  withStyles(styles)
)(Navigation);
