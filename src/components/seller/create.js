import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
  },
  button: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop:30,
  },
  formControl: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});


class ComposedTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstname:'',
            lastname:'',
            address:'',
            password:'',
            email:'',
            phone: ''
        
          };
          this.submitHandler = this.submitHandler.bind(this);
          this.handleChange = this.handleChange.bind(this);

          this.handleClose = this.handleClose.bind(this);
      }

      handleChange = username => event => {
        this.setState({
          [username]: event.target.value
        });
      };
      

      submitHandler(e) {
        e.preventDefault();
        const sellers = {
            username : this.state.username,
            firstname : this.state.firstname, 
            lastname : this.state.lastname,
            address : this.state.address,
            password : this.state.password, 
            email : this.state.email,
            phone : this.state.phone
          };
        axios
          .post(`${process.env.REACT_APP_API_URL}/sellers/register`, {username : this.state.username,
          firstname : this.state.firstname, 
          lastname : this.state.lastname,
          address : this.state.address,
            password : this.state.password,  
          email : this.state.email,
          phone : this.state.phone,})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({ sellers });
          });
      }

      handleClose() {
        this.setState({
            showModule: '',
            modal: false
        });
    }
      


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
      <form onSubmit={this.submitHandler}>
        <FormControl className={classes.formControl}>
          <InputLabel>UserName</InputLabel>
          <Input value={this.state.username} onChange={this.handleChange('username')} />
          
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Firstname</InputLabel>
          <Input value={this.state.firstname} onChange={this.handleChange('firstname')} />
          
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Lastname</InputLabel>
          <Input value={this.state.lastname} onChange={this.handleChange('lastname')} />
        </FormControl>
       

        <TextField
          label="Address"
          value={this.state.address} onChange={this.handleChange('address')}
          placeholder="Address"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Phone"
          value={this.state.phone} onChange={this.handleChange('phone')}
          placeholder="phone"
          fullWidth
          margin="normal"
        />


        <Button variant="contained" color="primary" type="submit" className={classes.button}>
            Add
        </Button>
        <Button style={{marginLeft: '8px'}}  variant="contained" color="primary" type="button" onClick={this.handleClose} className={classes.button}> Cancel
        </Button>
        </form>
        
      </div>
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);