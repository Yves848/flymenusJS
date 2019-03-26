import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import compose from 'recompose/compose';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Select from '@material-ui/core/Select';

const INITIAL_PLAT = require('./plat.json');

const styles = theme => ({
  button: {
    width: '100%',
  },
  textField: {
    width: '100vw',
  },
  grid: {
    marginBottom: '25px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const Transistion = props => {
  return <Slide direction="up" {...props} />;
};
class AjoutPlat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plat: { ...INITIAL_PLAT },
    };
  }

  render() {
    const { classes, categs } = this.props;
    const { plat } = this.state;

    const itemList = categs.map((categ, index) => {
      return <MenuItem value={categ.index}>{categ.nom}</MenuItem>;
    });
    return (
      <Dialog open={this.props.isOpen} onClose={this.props.handleClose} TransitionComponent={Transistion} fullScreen>
        <h1>Ajout Plat</h1>
        <Grid container direction="column" alignItems="stretch" justify="space-around" spacing={24} className={classes.grid}>
          <Grid item>
            <TextField className={classes.textField} id="platNom" value={plat.Nom} label="Nom" variant="outlined" />
          </Grid>
          <Grid item>
          <FormControl variant="outlined">
            <Select
              className={classes.textField}
              value={plat.Categorie}
              onChange={this.handleCategChange}
              input={
                <OutlinedInput
                labelWidth={0}
                name="Categorie"
                id="outlined-age-simple"
              />
              }
              inputProps={{
                name: 'Categorie',
                id: 'platCateg',
              }}
            >
              {itemList}
            </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField className={classes.textField} id="platNom" value={plat.Nom} label="Nom" variant="outlined" />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-around" className={classes.grid}>
          <Grid item />
          <Grid item xs={4} sm={4}>
            <Button variant="outlined" color="secondary" onClick={this.props.handleClose} className={classes.button}>
              Annuler
            </Button>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Button variant="outlined" color="secondary" onClick={this.props.handleClose} className={classes.button}>
              Enregister
            </Button>
          </Grid>
          <Grid item />
        </Grid>
      </Dialog>
    );
  }
}

export default compose(withStyles(styles))(AjoutPlat);
