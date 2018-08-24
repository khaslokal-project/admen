import React, { Component } from 'react';
import CategoryAdd from './pages/Category';
import Login from './components/Login';
import ProductAdd from './pages/Product';
import Product from './pages/ListProduct';
import ProductUpdate from './pages/ProductUpdate';
import Sellers from './pages/ListSeller';
import SellerAdd from './pages/Seller';
import SellersUpdate from './pages/SellerUpdate';
import Category from './pages/Listcategory';
import CategoryUpdate from './pages/CategoryUpdate';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route  path ="/login" component={Login} />
                        
                        
                        <Route exact path="/category" component={Category} />
                        <Route exact path="/category/add" component={CategoryAdd} />
                        <Route path="/category/:id" component={CategoryUpdate} />
                        

                        <Route  path="/product/add" component={ProductAdd} />
                        <Route  path="/product" component={Product} />
                        <Route path="/product/:id" component={ProductUpdate} />


                        <Route path="/seller/add" component={SellerAdd} />
                        <Route path="/sellers" component={Sellers} />
                        <Route path="/seller/:id" component={SellersUpdate} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;