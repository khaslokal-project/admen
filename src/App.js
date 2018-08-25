import React, { Component } from 'react';
import CategoryAdd from './pages/Category';
import Login from './components/Login';
import ProductAdd from './pages/Product';
import ListProduct from './pages/ListProduct';
import ProductUpdate from './pages/ProductUpdate';
import Sellers from './pages/ListSeller';
import SellerAdd from './pages/Seller';
import SellersUpdate from './pages/SellerUpdate';
import Category from './pages/Listcategory';
import CategoryUpdate from './pages/CategoryUpdate';
import AppProvider from './components/AppProvider';
import AppContext from './components/AppContext';
import { reactLocalStorage } from 'reactjs-localstorage';
import axiosInstance from './components/AxiosInstance';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: ``,
            password: ``,
        };
    }
    render() {
        let tempDom = (<AppContext.Consumer>
            {(context) => {
                if (this.state.username && !context.admin.username){
                    context.handlers.signin(this.state);
                }
                
            }}

        </AppContext.Consumer>);
        return (
            <div>
                <Router>
                    <AppProvider>
                        <div>
                            <Switch>
                                <Route exact  path ="/login" component={Login} />
                        
                        
                                <Route exact path="/category" component={Category} />
                                <Route exact path="/category/add" component={CategoryAdd} />
                                <Route path="/category/:id" component={CategoryUpdate} />
                        

                                <Route  path="/product/add" component={ProductAdd} />
                                <Route   exact path="/product" component={ListProduct} />
                                <Route path="/product/:id" component={ProductUpdate} />


                                <Route path="/seller/add" component={SellerAdd} />
                                <Route path="/sellers" component={Sellers} />
                                <Route path="/seller/:id" component={SellersUpdate} />
                            </Switch>
                            {tempDom}
                        </div>
                    </AppProvider>
                </Router>
            </div>
        );
    }
    
    componentDidMount(){
        let token = reactLocalStorage.get(`token`);
        if (token){
            axiosInstance.get(`/admins/checktoken`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then( response => {
                    this.setState({
                        username: ``,
                        password: ``
                    });
                })
                .catch ( error => {
                    reactLocalStorage.set(`token`,false);
                    reactLocalStorage.setObject(`admin`, {});
                });
        }
    }
}

export default App;