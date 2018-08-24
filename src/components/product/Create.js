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
            brand:'',
            idcategory: '',
            idseller: '',
            description: '',
            image: '',
            dataSeller: [],
            dataCategory: []
        
          };
          this.submitHandler = this.submitHandler.bind(this);
          this.handleChange = this.handleChange.bind(this);
      }

      componentDidMount(){
        this.fetchDataSeller();
        this.fetchDataCategory();
    }

    fetchDataSeller(){
        axios.get(`${process.env.REACT_APP_API_URL}/sellers/`)
            .then(({ data }) => {
                this.setState({
                    dataSeller: data
                });
            });
    }

    fetchDataCategory(){
        axios.get(`${process.env.REACT_APP_API_URL}/productcategory/`)
            .then(({ data }) => {
                this.setState({
                    dataCategory: data
                });
            });
    }

      handleChange = (name) => event => {
        this.setState({
          [name]: event.target.value
        });
      };
      

      submitHandler(e) {
        e.preventDefault();
        const products = {
            name : this.state.name,
            price : this.state.price, 
            brand : this.state.brand,
            idcategory : this.state.idcategory,
            idseller : this.state.idseller, 
            description : this.state.description,
            image : this.state.image
          };
        axios
          .post(`${process.env.REACT_APP_API_URL}/products/`,
          {name : this.state.name,
          price : this.state.price, 
          // stock : this.state.stock, 
          brand : this.state.brand,
          idcategory : this.state.idcategory,
          idseller : this.state.idseller,  
          description : this.state.description,
          image : this.state.image,})
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
        <FormControl className={classes.formControl}>
          <InputLabel>Product Name</InputLabel>
          <Input value={this.state.name} onChange={this.handleChange('name')} />
          
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Price</InputLabel>
          <Input value={this.state.price} onChange={this.handleChange('price')} />
          
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Brand</InputLabel>
          <Input value={this.state.brand} onChange={this.handleChange('brand')} />
        </FormControl>
        <FormControl className={classes.formControl}>
        <TextField
          select
          label="Category"
          className={classes.textField}
          value={this.state.idcategory}
          onChange={this.handleChange('idcategory')}
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
          label="Seller"
          className={classes.textField}
          value={this.state.idseller}
          onChange={this.handleChange('idseller')}
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
          value={this.state.description} onChange={this.handleChange('description')}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image"
          value={this.state.image} onChange={this.handleChange('image')}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit" className={classes.button}>
            Add
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