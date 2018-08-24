import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {Link} from 'react-router-dom';
import {TableCell, Button} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import pink from '@material-ui/core/colors/pink';
import deepOrange from '@material-ui/core/colors/deepOrange';
import axios from 'axios'

import Delete from './Delete';

const CustomTableCell = withStyles(theme => ({
  head: {
    primary: pink,
    secondary: deepOrange,
  },
  palette: {
    primary: pink,
    secondary: pink,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class CustomizedTable extends React.Component {
    constructor(){
        super()
        this.state = {
           category: [],
           showModule: '',
           categoryDeleted: {}
        }

        this.closeModal = this.closeModal.bind(this);
        this.showDelete = this.showDelete.bind(this);
    }
    componentDidMount(){
        this.getData()
     }

    showDelete(category){
      this.setState({
        showModule: 'delete', 
        modal: true,
        categoryDeleted: category
      })
    }
    closeModal() {
      this.setState({
          showModule: '',
          modal: false
      });
  }
     getData(){
         axios.get(`/productcategory/`)
         .then((response) => {
             console.log(response);
             this.setState({category: response.data})
         })
         .catch((err) => {
             console.log(err);
         })
     }
     closeModal() {
      this.setState({
          showModule: '',
          modal: false
      });
  }

  
render() {
  const { classes } = this.props;
  const category = this.state.category
  const datas =category.map(category => 
  <TableRow className={classes.row} key={category.id}>
    <CustomTableCell component="th" scope="row"> {category.name}
    </CustomTableCell>
    <CustomTableCell>
    <Button variant="contained" color="primary" button component={Link} to="/sellerupdate">Edit</Button>
    <Button color="danger" 
                onClick={() => {
                    this.showDelete(category);
                }}
            >Delete</Button>
    </CustomTableCell>
      </TableRow>
      )

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead color='primary'>
          <TableRow>
            <CustomTableCell>Category Name</CustomTableCell>
            <CustomTableCell>Action</CustomTableCell>
          </TableRow>
        </TableHead>
        {datas}
      </Table>
      { (this.state.showModule === 'delete') && <Delete modal={this.state.modal} closeModal={this.closeModal} getData={this.getData} data={this.state.categoryDeleted}/> }
    </Paper>
  );
}
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);