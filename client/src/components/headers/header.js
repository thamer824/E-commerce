import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from './icons/menu.svg';
import close from './icons/close.svg';
import cartt from './icons/cart.svg';
import axios from 'axios';
import { Link } from 'react-router-dom'



function Header() {
    const value = useContext(GlobalState)
    
    const [isLogged] = value.userApi.isLogged
    const [isAdmin] = value.userApi.isAdmin
    const [cart] = value.userApi.cart;
    const [menu,setMenu] = useState(false)

     const logoutUser = async()=>{
          await axios.get("http://localhost:5000/user/logout")
          localStorage.clear()
          window.location.href="/";
     }
     

    const adminRouter = ()=>{
        return (
            <>
                <li><Link to='/create'>Create Products</Link></li>
                <li><Link to='/category'>Catgories</Link></li>
            </>
        )
    }
    const loggedRouter = ()=>{
        return (
            <>
                <li><Link to='/history'>Check Your History</Link></li>
                <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }
    
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (

        <header>    

            <div className="menu" onClick={()=> setMenu(!menu)} >
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo" >
                <h1>
                    <Link to="./">{ isAdmin ? 'Admin' : "TaymourShop" }</Link>
                </h1>

            </div>

            <ul style={styleMenu}>
                <li><Link to="./"> { isAdmin ? 'Products' : "shop" }</Link></li>
                {isAdmin && adminRouter()}   
                
                
                {
                    isLogged ? loggedRouter() : <li><Link to="./Login"> Login  or  Register</Link></li>
                }
                
                <li onClick={()=> setMenu(!menu)}>
                    <img src={close} alt="" className="menu" width="30" />
                </li>

            </ul>

            {isAdmin ? ''
             : 
            
            <div className="cart-icon">
                <span>{cart.length}</span> 
                <Link to="./cart"> <img src={cartt} alt="" width="30" /></Link>

            </div> }

           
            
        </header>

    )


}


export default Header


