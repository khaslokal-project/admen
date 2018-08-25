import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axiosInstance from '../components/AxiosInstance';
import {Redirect} from 'react-router';
import { reactLocalStorage } from 'reactjs-localstorage';
import {Link} from 'react-router-dom';


import AppContext from '../components/AppContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ``,
            username: ``,
            error: null,
            islogin: false
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitHandler(e) {
        e.preventDefault();
        axiosInstance
            .post(`/admins/login`, this.state)
            .then( ( { data } ) => {
                reactLocalStorage.set(`token`,data.token);
                this.setState({
                    islogin: true,
                    dataLogin: data
                });
                console.log(data);
                
            })
            .catch( error => {
                this.setState({ error: ( error && error.response && error.response.data && error.response.data.message ) });
            });
            
    }

    render() {
        let view  = undefined;
        let viewButton = (
            <div>
                <AppContext.Consumer>
                    {(context) => {
                        let login = () => {
                            axiosInstance
                                .post(`/admins/login`, this.state)
                                .then( ( { data } ) => {
                                    reactLocalStorage.set(`token`,data.token);
                                    context.handlers.signin(data);
                                    this.setState({
                                        islogin: true
                                    });
                                })
                                .catch( error => {
                                    this.setState({ error: ( error && error.response && error.response.data && error.response.data.message ) });
                                });
                        };
                        return (
                            <Button color="primary" type="button" onClick={login} component={Link} to="/product"> Login </Button>
                        );
                    }}
                </AppContext.Consumer>
            </div>
        );

        if (this.state.islogin){
            view = (
                <Redirect to="/product"/>
            );
        }
        else{
            view = (
                <div>
                    <Dialog
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
                            />{` `}
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
                            />{` `}
                            {viewButton}
                        </DialogContent>
                    </Dialog>
                </div>
            );
        }
        return (<div>{ view }</div>);
    }
}

export default Login;



 