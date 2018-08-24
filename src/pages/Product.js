import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormProduct from '../components/product/Create'
import Bar from '../components/AppBar'


const styles = theme => ({
  root: {
    textAlign: 'center',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    marginTop:20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
  },
  
  formControl: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
        <Bar />
        <div className={classes.container}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          Form add product
        </Typography>
        <Typography component="p">
          <FormProduct />
        </Typography>
      </Paper>
      </div>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);