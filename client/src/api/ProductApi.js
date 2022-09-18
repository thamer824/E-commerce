import React ,  {useState , useEffect} from 'react'
import axios from 'axios'


function ProductApi() {
         const [products , setProducts] = useState([])
         const[callback,setCallback] = useState(false)
         const [category, setCategory] = useState('')
         const [sort, setSort] = useState('');
         const [page, setPage] = useState('');
         const [search, setSearch] = useState('');
         const [result, setResult] = useState('');



         
         const getProducts = async ()=>{
            const res = await axios.get(`http://localhost:5000/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)                                
            setResult(res.data.result)
           
         }

   useEffect(() =>{
    getProducts();
   },[callback,category,sort,search,page])
 
  return {
       /*  hedh koul alik kotlou eli l products heya l usetsate li lfook */
           products : [products , setProducts],
           callback : [callback,setCallback],
           category: [category, setCategory] ,
           sort: [sort, setSort],
           page: [page, setPage],
           search: [search, setSearch],
         result:[result, setResult]


     /* deja houma curly brace donc hedii bch tpassi data w tnajem tchoufhaa fl console.log mouch ka function tchou l ProductApi tnajem tchouf data li fi west l functn  */
  }
}

export default ProductApi