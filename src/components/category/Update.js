import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
            name: ''
        
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_URL}/sellers/${this.props.id}`)
            .then(res => {
                this.setState({
                    name: res.data.name
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
        axios.put(`${process.env.REACT_APP_API_URL}/productcategory/${this.props.id}`, this.state)
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
          <InputLabel>Product Name</InputLabel>
          <Input type="text" 
                name="name"
                value={this.state.name}
                id="name"
                onChange={this.handleChange} />
          
        </FormControl>

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