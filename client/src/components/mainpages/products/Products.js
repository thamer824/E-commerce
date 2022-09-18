import React ,{useContext,useState} from 'react';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productitem/ProductItem';
import Loading from '../utils/loding/Loading';
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
function Products() {


  // !!!!!!!!!!!!!!!!!!!!
  const state = useContext(GlobalState)
  
   const [products,setProducts] = state.productApi.products;
   const [isAdmin] = state.userApi.isAdmin;
   const [token] = state.token;
   const [callback,setCallback] = state.productApi.callback;
   const [loading,setLoading] = useState(false);
  const [isCheck,setIsCheck] = useState(false);

   
   const deleteProduct =  async (id,public_id)=>{
    console.log({id,public_id});
    try {
     setLoading(true)
      await axios.post('http://localhost:5000/api/destroy',{public_id},{headers:{Authorization: token}})
      await axios.delete(`http://localhost:5000/api/products/${id}`,{headers:{Authorization: token}})
      setCallback(!callback)
      setLoading(false)
    } catch (error) {
     alert(error.response.data.msg)
    }
  }  


   const handlecheck = (id)=> {
    products.forEach(product => {
        if(product._id === id) product.checked = !product.checked
    });
    
    setProducts([...products])
   }


   const deleteAll = ()=>{
    products.forEach(product =>{
      if(product.checked) deleteProduct(product._id,product.images.public_id)
    })
   }

const checkAll = ()=> {
  products.forEach(product => {
    product.checked = !isCheck
  })
  setProducts([...products])
  setIsCheck(!isCheck)
}

   if(loading) return <div className="products"><Loading/></div>

  return (


    <>
          <Filters/>
         {
          isAdmin && 
          <div className="delete-all">
            <span>Seleect All</span>
            <input type="checkbox" checked={isCheck} onChange={checkAll}/>
            <button onClick={deleteAll}>Delete All</button>


          </div>
         }
    
    
    

    <div className="products">
        {
          
          products.map( product =>{
            return <ProductItem key={product._id} product={product} isAdmin={isAdmin} deleteProduct={deleteProduct} handlecheck={handlecheck}   />
          })
         
        }

    </div>
    <LoadMore/>
    {products.length === 0 && <Loading />}
    </>
  )
}

export default Products