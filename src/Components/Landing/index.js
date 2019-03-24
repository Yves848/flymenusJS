import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import back from '../../Assest/Images/Icon256.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 9,
  }

})

class Landing extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.root} container direction="column" alignContent="center" justify="center">
        <Grid item>
          <img src={back} alt=""></img>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Landing);
