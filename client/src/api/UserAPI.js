import React ,{useState,useEffect} from 'react'
import axios from'axios'


function UserAPI(token) {

const [isLogged, setIsLogged] = useState(false)
const [isAdmin, SetIsAdmin] = useState(false)
const [cart , setCart] = useState([])

const [history, setHistory] = useState([])

useEffect(()=>{
if(token){
    const getUser = async()=>{
        try {
            const res = await axios.get('http://localhost:5000/user/infor',{
                headers: {Authorization: token}
            })
            console.log(res)
            setIsLogged(true)
            res.data.role === 1 ? SetIsAdmin(true) : SetIsAdmin(false)
            // setcart hedi bch tsajalhom fl cart bch ki trefreshi matokodch taawed thothom fl cart
            setCart(res.data.cart)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    getUser()
}

},[token])

useEffect(() =>{
    if(token) {
        const getHistory = async() =>{
            const res = await axios.get('http://localhost:5000/user/history' , {
                headers: {Authorization: token}
            })
            setHistory(res)
        }
        getHistory()
    }
    
})


const addCart = async(product)=>{
    if(!isLogged) return alert("please login to continue buying")
    // The every() method tests whether all elements in the array pass the test implemented by the provided function. 
    //It returns a Boolean value.
    const check = cart.every(item =>{
        return item._id !== product._id
    }) 
    // lena lezemhom ykounou diffrentt khater ken mouch differetnt l id li fl cart wl id mtee l produit manetha rahou c bon zedtha enti fl carte 
    if(check){
       // lena ken l id mouch kifkif manetha kol item tsetih lel cart 
        setCart([...cart,{...product, quantity:1}]) // hedhi manetha l setCart tupdayti l cart bl product jdid // hedhi tjiblek l produit mteek w tseti l cart b quantity 1 manetha l quantity hedi tzdha zyedi mehich mawjouda raw fl productModel
       // lena nhotou l api mtee l cart li heya juste tupdayti l user w thotlou cart 
      try {
        await axios.patch('http://localhost:5000/user/addcart',{cart:[...cart,{...product, quantity:1}]},{ 
            headers:{Authorization:token}
           })
      } catch (error) {
        alert(error.response.data.msg)
      }
    }else{
        alert("this product has been added to cart already")
    }
}



  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, SetIsAdmin],
    cart: [cart, setCart],
    history: [history, setHistory],
    addCart : addCart

  }
    
}

export default UserAPI
