import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
            name: '',
        
          };
          this.submitHandler = this.submitHandler.bind(this);
          this.handleChange = this.handleChange.bind(this);
      }

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        });
      };
      

      submitHandler(e) {
        e.preventDefault();
        const products = {
            name : this.state.name,
          };
        axios
          .post(`http://192.168.10.13:8080/productcategory/}`, {name : this.state.name})
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({ products });
          });
      }
      


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
      <form onSubmit={this.submitHandler}>
        <TextField
          label="Category name"
          value={this.state.name} onChange={this.handleChange('name')}
          placeholder="Category name"
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit" className={classes.button}>
            Add
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