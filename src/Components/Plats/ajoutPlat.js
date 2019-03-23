import React, { Component } from 'react'
import {withStyles} from "@material-ui/core/styles"
import classNames from "classnames"
import compose from "recompose/compose"
import Dialog from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button"
import Slide from "@material-ui/core/Slide"


const INITIAL_PLAT = require("./plat.json");

const styles= theme => ({
  button: {
    flexGrow: 1,
    padding: theme.spacing.units *2
  }
})
class AjoutPlat extends Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <Dialog open={this.props.isOpen}
      onClose={this.props.handleClose}
      fullScreen>
        <h1>Ajout Plat</h1>
        <div className={classes.button}>
          <Button  variant="outlined" color="secondary" onClick={this.props.handleClose}>Fermer</Button>
        </div>
      </Dialog>
    )
  }
}

export default
compose(
  withStyles(styles)
)(AjoutPlat);
