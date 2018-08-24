import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        password: '',
        username: '',
        error: null,
        valerrors: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
}

  render() {
    return (
        <div>
      <Dialog to="/login"
        open 
        fullScreen={this.props.fullScreen}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent onSubmit={this.submitHandler}>
        {this.state.valerrors && this.state.valerrors.username && (
        <p>{this.state.valerrors.username.msg}</p>
          )}
          <TextField
            autoFocus
            onChange={this.changeHandler}
            type="username"
            name="username"
            id="username"
            label="Username anda"
            fullWidth
          />{' '}
          {this.state.valerrors &&
              this.state.valerrors.password && (
              <p>{this.state.valerrors.password.msg}</p>
              )}
          <TextField
            autoFocus
            onChange={this.changeHandler}
            type="password"
            name="password"
            id="password"
            label="Kata Sandi"
            fullWidth
          />{' '}
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={this.props.toggleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
  changeHandler(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    axios
        .post(`/admin/login`, this.state)
        .then(res => {
            if (res.data.error) {
                return this.setState({ error: res.data.message });
            }
            if (res.data.errors) {
                return this.setState({ valerrors: res.data.errors });
            }
            return (window.location = '/listproduct');
        });
    }
} 

export default Login;