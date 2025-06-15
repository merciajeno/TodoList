// create the context
import {createContext, useContext} from "react";
import {useState} from "react";

export const AuthContext= createContext();
export const useAuth=()=>useContext(AuthContext);

// put some state

// share the context

export default function AuthProvider({children}){
    const [username,setUsername] = useState(null)
    const [number,setNumber]=useState(9);
    const [isAuthenticated,setAuthenticated] = useState(false)
    function login(username, password){
        if(username.trim() === 'in28minutes' && password.trim() === 'Mercia'){
            setAuthenticated(true);
            setUsername(username.trim())
            return true;
        }
        else
        {
            setUsername(null);
            setAuthenticated(false);
            return false;
        }
    }
    function logout(){
        setAuthenticated(false);
    }
    setInterval(()=>setNumber(number+1),10000)
    return(
        <AuthContext.Provider value={{number, isAuthenticated, setAuthenticated,login,logout,username}}>
            {children}
        </AuthContext.Provider>
    )
}