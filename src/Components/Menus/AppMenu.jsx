import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
   root: {
      flexGrow: 1
   },
   grow: {
      flexGrow: 1
   },
   menuButton: {
      marginLeft: -12,
      marginRight: 20
   }
}
class AppMenu extends Component {

   render() {
      const { classes } = this.props;
      return (
         <div className={classes.root}>
            <AppBar position='static'>
               <ToolBar>
                  <IconButton className={classes.menuButton} color="inherit">
                     <MenuIcon></MenuIcon>
                  </IconButton>
                  <Typography variant="h6" color="inherit" className={classes.grow}>
                  </Typography>
                  <Button color='inherit'>Login</Button>
               </ToolBar>
            </AppBar>
         </div>
      )
   }
}

export default withStyles(styles)(AppMenu)
