import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {

  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  })


  const onChangeInput = (event)=>{
    setUser({...user,[event.target.name]:event.target.value}) 
  }


 const RegisterSubmit = async (event)=> {
     event.preventDefault();
try {
   const {name,email,password} = user;
    await axios.post("http://localhost:5000/user/register",{
    name,email, password })
      localStorage.setItem('firstLogin',true)
    navigate('/')

} catch (error) {
  alert(error.response.data.msg)   // hedhi maneha akra l error mtaa response mtaa l post li amaltha
}

 }

  
  return (
    <div className="login-page">
    <form onSubmit={RegisterSubmit}>
        <h2>Register</h2>
        <input type="name" name="name" required
        placeholder="Email"  onChange={onChangeInput} />
        <input type="email" name="email" required
        placeholder="Email"  onChange={onChangeInput} />

        <input type="password" name="password" required autoComplete="on"
        placeholder="Password"  onChange={onChangeInput} />

        <div className="row">
            <button type="submit">Register</button>
            <Link to="/login">Login</Link>
        </div>
    </form>
</div>
  )
}

export default Register