import React,{useState , useEffect} from 'react'
import axios from 'axios';


function CategoryApi() {
    const[categories,setCategories] = useState([])
    const [callback , setCallback] = useState(false);
    // hahaha fazet l callback zaboura alekher maw ahna ki nzidou category lezem trefreshi l page bch tnajem tchoufha donc lena aalna l callback bch kol ma tposti category steti l callback l true donc fl get thot fl useEffect fl [] callback manetha matarefreshi l page ela maysir change fl callback
  
   useEffect(() => {
          const getCategory = async()=>{
            // ken tansa l await trajaalek promise mouch object wela daata
            const res = await axios.get('http://localhost:5000/api/category')
            setCategories(res.data)
          }
          getCategory()
   },[callback])


  return {
    categories: [categories,setCategories],
    callback: [callback , setCallback] 
  }
}

export default CategoryApi