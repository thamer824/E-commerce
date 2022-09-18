import React ,{useState , useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'

function Category() {

    const state = useContext(GlobalState)
 const [categories] = state.categoryApi.categories
 const [callback,setCallback] = state.categoryApi.callback;
 const [onEdit,setOnEdit] = useState(false)
 const [id,setId] = useState("")
const [category,setCategory] = useState("");
const [token] = state.token;




 const createCategory = async e => {
  e.preventDefault();
  try {
    if(onEdit) {
      const res = await axios.put(`http://localhost:5000/api/category/${id}`,{name:category},{headers:{Authorization: token}})
    alert(res.data.msg)
    }else{
    const res = await axios.post("http://localhost:5000/api/category",{name:category},{headers:{Authorization: token}})
    alert(res.data.msg)
    }
    setOnEdit(false)
    setCategory('')
    setCallback(!callback)

  } catch (error) {
    alert(error.response.data.msg)
  }
 }


 const editCategory = async(id , name)=>{
       setId(id)
       setCategory(name)
       setOnEdit(true)
 }


 const deleteCategory = async (id)=>{

   try {
        const res = await axios.delete(`http://localhost:5000/api/category/${id}`,{headers:{Authorization: token}})
        alert(res.data.msg)
        setCallback(!callback)
   } catch (error) {
    alert(error.response.data.msg)
   }

 }


// hahhahah fazet l buttonli fih onEdit w save mezyena l faza
  return (
    <div className="categories">
        <form onSubmit={createCategory}>
            <label htmlFor="category">Category Name</label>
            <input type="text" name="category" value={category} required
            onChange={(e)=> setCategory(e.target.value)} />
           
            <button type="submit">{onEdit? "Update" : "Save"}</button>
        </form>

        <div className="col">
  
           {
                  categories.map(category =>(
                   <div className="row" key={category._id}>

                        <p>{category.name}</p>
                        <div>
                          <button onClick={()=>editCategory(category._id,category.name)}>Edit</button>
                          <button onClick={()=>deleteCategory(category._id)}>Delete</button>
                        </div>

                   </div>
                  ))


           }


        </div>


    </div>
  )
}

export default Category