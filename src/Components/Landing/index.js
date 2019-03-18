import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import back from '../../Assest/Images/Icon256.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit *2,
  }

})

class Landing extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.root} container direction="column" alignContent="center">
        <Grid item>
          <img src={back}></img>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Landing);
