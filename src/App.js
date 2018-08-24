import React, { Component } from 'react';
import Category from './pages/Category'
import Login from './components/Login'
import Product from './pages/Product'
import ListProduct from './pages/ListProduct'
import Productupdate from './pages/ProductUpdate';
import Sellers from './pages/ListSeller';
import Selleradd from './pages/Seller'
import Sellersupdate from './pages/SellerUpdate';
import ListCategory from './pages/Listcategory';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route  exact path="/login" component={Login} />
          <Route  path="/addcategory" component={Category} />
          <Route  path="/addproduct" component={Product} />
          <Route  path="/listproduct" component={ListProduct} />
          <Route path="/update" component={Productupdate} />
          <Route path="/selleradd" component={Selleradd} />
          <Route path="/sellers" component={Sellers} />
          <Route path="/sellerupdate" component={Sellersupdate} />
          <Route path="/listcategory" component={ListCategory} />
        </Switch>
      </Router>
    );
  }
}

export default App;