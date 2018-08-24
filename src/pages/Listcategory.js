import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Listcategory from '../components/category/Listcategory';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

import Bar from '../components/AppBar';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        marginTop:20,
    },
  
    formControl: {
        margin: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

function PaperSheet(props) {
    const { classes } = props;

    return (
        <div> <Bar />
            <div className={classes.container}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3">
              List data category
                    </Typography>
                    <Button variant="contained" color="primary" component={Link} to="/category/add" >Add Category</Button>
                    {/* <Typography component="p"> */}
                    <Listcategory />
                    {/* </Typography> */}
                </Paper>
            </div>
        </div>
    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);