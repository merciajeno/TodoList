import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContext";

export default function LoginComponent(){
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [showSuccess,setShowSuccess] = useState(false);
    const [showError,setShowError] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    const login = auth.login;

    function handleSubmit()
    {
        if(login(userName,password)){

            setShowSuccess(true);
            setShowError(false);
            navigate(`/welcome/${userName}`);
            console.log('Success')
        }
        else
        {

            setShowError(true);
            setShowSuccess(false);
            console.log('Error')
            navigate('/error')
        }
    }
    return(
        <div className="LoginComponent">
            {showSuccess && <div>Successful</div>}
            {showError &&<div>Authentication failed</div>}
            <div className="username">
                <label>Username:</label>
                <input type="text" name="username" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="password">
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="Login">
                <button type="button" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}