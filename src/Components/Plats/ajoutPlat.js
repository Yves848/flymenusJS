import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import compose from "recompose/compose";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";

const INITIAL_PLAT = require("./plat.json");

const styles = theme => ({
  button: {
    flexGrow: 1,
    padding: theme.spacing.units * 2
  }
});

const Transistion = props => {
  return <Slide direction="up" {...props} />;
};
class AjoutPlat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plat: { ...INITIAL_PLAT }
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        TransitionComponent={Transistion}
        fullScreen
      >
        <Grid container direction="row">
          <Grid item>
          </Grid>
        </Grid>
        <h1>Ajout Plat</h1>
        <div className={classes.button}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.props.handleClose}
            fullWidth
          >
            Fermer
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default compose(withStyles(styles))(AjoutPlat);
