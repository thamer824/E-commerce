import React , {useState, useEffect , useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loding/Loading'
import {useNavigate,useParams} from 'react-router-dom'


const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description:'How to master ReactJS fast',
    content:'web devolepment comon man go for it inchalah we can do it and inchalh it stills growing and gowing for more and more productivity and be needed',
    category: ''
}
function CreateProduct() {



 const state = useContext(GlobalState)
 const [product , setProduct] = useState(initialState)
 const [category , setCategory] = state.categoryApi.categories
 const[isAdmin] = state.userApi.isAdmin
 const[token] = state.token
 const [images , setImages] = useState(false)
 const [loading,setLoading] =  useState(false)
const navigate = useNavigate();
const params = useParams();
const[products,setProducts] = state.productApi.products;
const[onEdit,setOnEdit] = useState(false)
const [callback,setCallback]=state.productApi.callback

useEffect(() => {
   if(params.id){
         setOnEdit(true)
         products.forEach(product=>{
            if(product._id === params.id) {
                setProduct(product)
                setImages(product.images)
            }
         })
        
   }else{
    setOnEdit(false)
    setProduct(initialState)
    setImages(false)
    
   }
},[params.id,products])


const hundleUpload = async e =>{
    e.preventDefault()
    try {
        if(!isAdmin) return alert("you are not an admin")
        // hedhhi kifech tal l files
        const file = e.target.files[0]
        

        if(!file) return alert("File does not exists.")
      

        if(file.size > 1024*1024) // 1mb 
        return alert("size too large")

        if(file.type !== 'image/jpeg' && file.type !== 'image/png' ) return alert("File format is incorrect")
        
        let formData = new FormData()
        formData.append('file', file)
        setLoading(true)
        const res = await axios.post('http://localhost:5000/api/upload', formData,

        {headers:{'content-type': 'multipart/form-data',Authorization:token}}
        )
        
        setLoading(false)
        setImages(res.data)
    } catch (error) {
        alert(error.response.data.msg)
    }

}

const hundleDestroy = async () => {
    try {
        if(!isAdmin) return alert("you are not an admin")
        setLoading(true)
        await axios.post('http://localhost:5000/api/destroy',{public_id:images.public_id},
          {headers:{Authorization: token}}
        )
        setLoading(false)
        setImages(false)
    } catch (error) {
        alert(error.response.data.msg)
    }
}

const handleChangeInput = event =>{
      
       
       setProduct({...product,[event.target.name]:event.target.value}); 
}


const hundleSubmit =async e =>{
    e.preventDefault();
    try {
        if(!isAdmin) return alert("you are not an admin")
        if(!images) return alert("No iamge uploaded");

       if(onEdit){
        await axios.put(`http://localhost:5000/api/products/${product._id}`,{...product , images},
        {headers:{Authorization: token}});
       }else{
        await axios.post('http://localhost:5000/api/products',{...product , images},
        {headers:{Authorization: token}});
       }

        // hedi manetha seti l product lkool li amlthom c bon fl handleChangeInput w badali l image khater mehich maahom fl form 
        setCallback(!callback)
        setImages(false)
        setProduct(initialState)
        
        navigate('/')
    } catch (error) {
        alert(error.response.data.msg)
    }
}

 const up = {
    display: images ? "block":"none"
 }

  return (
    <div className='cerate_product'>
         <div className='upload'>
            <input type="file" name="file" id="file_up" onChange={hundleUpload} />
            {

             loading ?  
              <div id="file_img"><Loading/></div>
             :
             <div id="file_img" style={up}>
             <img src={images ? images.url : ''} alt=""/>
             <span onClick={hundleDestroy}>X</span>
           </div>

            }
         </div>
         
    <form onSubmit={hundleSubmit}>
        <div className="row">
            <label htmlFor="product_id">Product_ID</label>
            <input type="text" name="product_id" id="product_id" required   onChange={handleChangeInput} disabled={onEdit}/>
        </div>
        <div className="row">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" required   onChange={handleChangeInput}/>
        </div>
        <div className="row">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" required   onChange={handleChangeInput}/>
        </div>
        <div className="row">
            <label htmlFor="description">Description</label>
            <textarea type="text" name="description" id="description" required  value={product.description} onChange={handleChangeInput} rows="5"/>
        </div>
        <div className="row">
            <label htmlFor="content">content</label>
            <textarea type="text" name="content" id="content" required   onChange={handleChangeInput} rows="7"/>
        </div>
        <div className="row">
            <label htmlFor="category">Category: </label>
            <select  name="category"  required   onChange={handleChangeInput}>
              <option value="">Please select a Ctegory</option>

                 {
                    category.map(cat =>(
                        <option value={cat._id} key={cat._id}>{cat.name}</option>
                    ))
                 }
              
            </select>
        </div>
        <button type="submit">{onEdit? "Update": "Create"}</button>
    </form>
    </div>
  )
}

export default CreateProduct
