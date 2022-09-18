import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import axios from 'axios';
function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })


  const onChangeInput = (e) => {
    const {name,value} = e.target;
    setUser({ ...user, [name]: value })

  };

  const loginSubmit = async event => {  
    event.preventDefault()  //submit form reload the browser donc ki naamlou preventdefault yaml submit men ghir mayrelodi l page
    
    try {
      
     const {email,password} = user;
      await axios.post('http://localhost:5000/user/login', {email,password},{ withCredentials: true })
      
        localStorage.setItem('firstLogin', true) // khater ken matrodhech Json sring tarjaalek ka object
        window.location.href = "/"
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="login-page">
    <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" required
        placeholder="Email" value={user.email} onChange={onChangeInput} />

        <input type="password" name="password" required autoComplete="on"
        placeholder="Password" value={user.password} onChange={onChangeInput} />

        <div className="row">
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
        </div>
    </form>
</div>
  )
}

export default Login