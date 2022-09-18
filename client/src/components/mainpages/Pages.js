import React ,{useContext} from "react";
import Products from './products/Products';
import Category from './categories/Category';
import {Routes , Route} from 'react-router-dom'
import Register from './auth/Register';
import Login from './auth/Login';
import Details from './detailProduct/DetailProduct';
import Cart from './cart/Cart';
import NotFound from './utils/NotFound/not_found';
import OrderHistory from './history/OrderHistory';
import CreateProduct from './createProduct/CreateProduct';

import {GlobalState} from '../../GlobalState'
function Pages(){
   const state = useContext(GlobalState)
   const [isLogged] = state.userApi.isLogged;
   const [isAdmin] = state.userApi.isAdmin;


return (
   
      
     <Routes >
        <Route path="/" exact="true" element={<Products/>} />
        <Route path="/detail/:id" exact="true" element={<Details/>} />

        <Route path="/Register" exact="true" element={isLogged ?<NotFound/>:<Register/>} />
        <Route path="/Login" exact="true" element={isLogged ?<NotFound/>:<Login/>} />
        <Route path="/history" exact="true" element={isLogged ?<OrderHistory/>:<NotFound/>} />
        <Route path="/Cart" exact="true" element={<Cart />} />
        <Route path="/create" exact="true" element={isAdmin? <CreateProduct/> : <NotFound/>} />
        <Route path="/edit_product/:id" exact="true" element={isAdmin? <CreateProduct/> : <NotFound/>} />
        <Route path="/category" exact="true" element={isAdmin ?<Category/>:<NotFound/>} />

        {/* l path * heka maneha ay haja tetktebha mouch teb3in l routes hadom ab3athom ynaykou */}
        <Route path="*" exact element={<NotFound/>} /> 
     </Routes>
     
)
}

export default  Pages


