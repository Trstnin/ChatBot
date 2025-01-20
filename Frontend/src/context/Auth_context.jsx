import { createContext,  useState, useEffect, useContext } from "react";
import { loginUser } from "../helpers/api-comunicator.js";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{
    const[user, setUser] = useState(null)
    const[isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
      //fetch if user's cookies are valid then skip login
    }, [])

    const login =async (email ,password) => {
      const data = await loginUser(email,password)
      if(data){
        setUser({email:data.email , name:data.name});
        setIsLoggedIn(true)
      }
    }
    const signup =async (name, email ,password) => {}
    const logout =async () => {}

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout
    }

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth =  () => useContext(AuthContext)