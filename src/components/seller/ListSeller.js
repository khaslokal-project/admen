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

import Delete from './delete';

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
           sellers: [],
           showModule: '',
           sellersDeleted: {}
        }

        this.closeModal = this.closeModal.bind(this);
        this.showDelete = this.showDelete.bind(this);
    }
    componentDidMount(){
        this.getData()
     }

    showDelete(sellers){
      this.setState({
        showModule: 'delete', 
        modal: true,
        sellersDeleted: sellers
      })
    }
    closeModal() {
      this.setState({
          showModule: '',
          modal: false
      });
  }
     getData(){
         axios.get(`/sellers/`)
         .then((response) => {
             console.log(response);
             this.setState({sellers: response.data})
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
  const sellers = this.state.sellers
  const datas =sellers.map(sellers => 
  <TableRow className={classes.row} key={sellers.id}>
    <CustomTableCell component="th" scope="row"> {sellers.username}
    </CustomTableCell>
    <CustomTableCell>{sellers.firstname}</CustomTableCell>
    <CustomTableCell>{sellers.lastname}</CustomTableCell>
    <CustomTableCell>{sellers.address}</CustomTableCell>
    <CustomTableCell>{sellers.email}</CustomTableCell>
    <CustomTableCell>{sellers.phone}</CustomTableCell>
    <CustomTableCell>
    <Button variant="contained" color="primary" button component={Link} to="/sellerupdate">Edit</Button>
    <Button color="danger" 
                onClick={() => {
                    this.showDelete(sellers);
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
            <CustomTableCell>UserName</CustomTableCell>
            <CustomTableCell>Firstname</CustomTableCell>
            <CustomTableCell>Lastname</CustomTableCell>
            <CustomTableCell>Address</CustomTableCell>
            <CustomTableCell>Email</CustomTableCell>
            <CustomTableCell>Phone</CustomTableCell>
            <CustomTableCell>Action</CustomTableCell>
          </TableRow>
        </TableHead>
        {datas}
      </Table>
      { (this.state.showModule === 'delete') && <Delete modal={this.state.modal} closeModal={this.closeModal} getData={this.getData} data={this.state.sellersDeleted}/> }
    </Paper>
  );
}
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);