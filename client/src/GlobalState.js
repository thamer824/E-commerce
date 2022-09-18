import React ,{ createContext , useState ,useEffect }from 'react';
import ProductApi from './api/ProductApi';
import axios from 'axios';
import UserAPI from './api/UserAPI';
import CategoryApi from './api/CategoryApi';
export const GlobalState = createContext();



export const DataProvider = ({children})=>{
     
    const [token ,setToken] = useState(false)    
    

    // hedhi feha fazet token li kateetheli !!!!!!!!!!!!!!!!!!!!!
    const refreshToken = async ()=>{
        try {
        const a = await axios.get("http://localhost:5000/user/refresh_token",{ withCredentials: true });
        setToken(a.data.accesstoken)
         
        } catch (error) {
            alert(error.response.data.msg)
        }
    }



    const state = {
        token : [token ,setToken],
        productApi : ProductApi(),
        userApi: UserAPI(token),
        categoryApi:CategoryApi()
        
    }

    useEffect(() =>{
        const firstt = localStorage.getItem('firstLogin');
        if(firstt) refreshToken()
        
    },[])
    
    return (
        
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
        
        )


}


