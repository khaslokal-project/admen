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
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        axios.get(`/sellers/${this.props.id}`)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    address: res.data.address,
                    password: res.data.password,
                    email: res.data.email,
                    phone: res.data.phone
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/sellers/${this.props.id}`, this.state)
            .then(res => {
                this.close();
                this.props.fetchData();
            })
            .catch(error => {
                console.log(error);
            });
    }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
      <form onSubmit={this.submitHandler}>

        <FormControl className={classes.formControl}>
          <InputLabel>Username</InputLabel>
          <Input type="text" 
                name="username"
                value={this.state.username}
                id="username"
                onChange={this.handleChange} />
          
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Firstname</InputLabel>
          <Input 
                type="text"
                name="firstname"
                value={this.state.firstname}
                id="firstname" 
                onChange={this.handleChange}/>
        </FormControl>
        
        <FormControl className={classes.formControl}>
          <InputLabel>Lastname</InputLabel>
          <Input 
                type="text" 
                name="lastname" 
                value={this.state.lastname}
                id="lastname" 
                onChange={this.handleChange}/>
        </FormControl> 

        <FormControl className={classes.formControl}>
          <InputLabel>Password</InputLabel>
          <Input 
                 type="text" 
                 name="password" 
                 value={this.state.password}
                 id="password" 
                 onChange={this.handleChange}/>
        </FormControl>

        
        <TextField
                label="Address"
                type="text" 
                name="email" 
                value={this.state.email}
                id="email" 
                onChange={this.handleChange}
                fullWidth
                margin="normal"
        />

        <TextField
                label="Phone"
                type="text" 
                name="phone"
                value={this.state.phone}
                id="phone"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
        />

        <Button  variant="contained" color="primary" type="submit" className={classes.button}>
            Save
        </Button>
        <Button style={{marginLeft: '8px'}}  variant="contained" color="primary" type="button" onClick={this.close} className={classes.button}> Cancel
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