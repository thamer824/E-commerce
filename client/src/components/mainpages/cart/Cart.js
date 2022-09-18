import React, { useContext , useState ,useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'

import axios from 'axios'


function Cart() {
  const value = useContext(GlobalState)
  const [cart,setCart] = value.userApi.cart;
  const [token] = value.token
  const [total, setTotal] = useState(0)


  useEffect(()=>{
       const getTotal = ()=>{
        // behi lena l accumulator inicial 0 li lota edika w hoa kol ma l current value yetmapa all cart lkol yetzed lel accumulator
        const total = cart.reduce((accumulator,currentValue)=>{
              return accumulator + (currentValue.price * currentValue.quantity)
        },0)
        setTotal(total)
       }
       getTotal()
       addToCart()
  },[cart])


  const addToCart = async()=>{
     await axios.patch("http://localhost:5000/user/addcart",{cart},{ 
      headers: {Authorization: token}
     })

  }


  const increment = (id)=>{
          cart.forEach(item =>{
            if(item._id === id){
              item.quantity +=1
            }
          })
          setCart([...cart])
          addToCart()
  }

  const decrement = (id)=>{
    cart.forEach(item =>{
      if(item._id === id){
        item.quantity === 1 ? item.quantity = 1 : item.quantity -=1
      }
    })
    setCart([...cart])
    addToCart()
}


const removeProduct = id =>{
  if(window.confirm("Do you really want to Remove this item froom Cart?")){
    cart.forEach((item,index)=>{
      
      if(item._id === id){
        // splica remove or change elements within an array
        // l index hoa mnin the tabda tmapi fl array mtaek wl 1 kedech men item theb tremovi
        cart.splice(index,1)
      }
    })
    setCart([...cart])
  }
}
 
const tranSuccess = async(payment)=>{
  console.log(payment)
  const {paymentID , address} = payment;

  await axios.post('http://localhost:5000/user/payment',{
    cart,paymentID,address
  },{header : {Authorization:token}
})
 
   setCart([])
   addToCart()
   alert("you have successfully placed an order;/")

}


  if (cart.length === 0) {
    return <h2 style={{ textAlign: 'center', fontWeight: '5rem' ,padding:'250px 250px ' }}>Cart Empty</h2>
  }
  return (
    <div>{
      cart.map(product => (
        // lena amalna cart.map(p=>()) amalna parenthese mouch {} khater barcha divet menich bch nrajaa component kemel
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />
          <div className="box-detail">
            <h2>{product.title}</h2>

            <h3>£{product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button  onClick={()=>decrement(product._id)}>-</button>
              <span>{product.quantity}</span>
              <button  onClick={()=>increment(product._id)}>+</button>
            </div>

            <p>Sold:{product.sold}</p>
           <div className="delete" onClick={()=>removeProduct(product._id)}>
            X
           </div>
          </div>
        </div>


      ))

    }

    <div className="total">
      <h3>Total : $ {total} </h3>
      
    </div>

    </div>
  )
}

export default Cart