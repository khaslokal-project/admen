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
            name: '',
            price: '',
            stock: '',
            brand:'',
            idcategory: '1',
            idseller: '1',
            description: '',
            image: '',
            dataSeller: [],
            dataCategory: []
        
          };
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
      }


      componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_URL}/products/${this.props.id}`)
        .then(res => {
         this.setState ({
          name : res.state.name,
          price : res.state.price, 
          brand : res.state.brand,
          idcategory : res.state.idcategory,
          idseller : res.state.idseller, 
          description : res.state.description,
          image : res.state.image
         }) 
        })
      }


      handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        });
      };
      
      handleSubmit(event){
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/products/${this.props.id}`, this.state)
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
          <Input  type="text" 
                  name="name" 
                  value={this.state.name}
                  id="name" 
                  onChange={this.handleChange} />
          
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Price</InputLabel>
          <Input type="text" 
                                        name="price" 
                                        value={this.state.price}
                                        id="price" 
                                        onChange={this.handleChange}/>
          
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Brand</InputLabel>
          <Input type="text" 
                                        name="brand" 
                                        value={this.state.brand}
                                        id="brand" 
                                        onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
        <TextField
          select
          className={classes.textField}
          value={this.state.idcategory}
          onChange={this.handleChange}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
        {
            this.state.dataCategory.map(item => (<option key={item.id} value={item.id}> {item.name} </option>))
          }
        </TextField>
        </FormControl>

        <FormControl className={classes.formControl}>
        <TextField
          select
          label="Select"
          className={classes.textField}
          value={this.state.idseller}
          onChange={this.handleChange}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
        {
            this.state.dataSeller.map(item => (<option key={item.id} value={item.username} > {item.username}</option>))
          }
        </TextField>
        </FormControl>
        
        <TextField
          label="Description"
          type="text" 
          name="description" 
          value={this.state.description}
          id="description" 
          onChange={this.handleChange}
          fullWidth
          margin="normal" />

        <TextField
          label="Image"
         type="text" 
        name="image" 
        value={this.state.image}
        id="image" 
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