import './TodoApp.css'
import {BrowserRouter, Routes, Route, useParams, Link, Navigate} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import LoginComponent from "./LoginComponent";
import TodoComponent from "./TodoComponent";
import LogOutComponent from "./LogOutComponent";
import Error from "./Error";
import AuthProvider, {useAuth} from "./security/AuthContext"
import axios from "axios";
import {useState} from "react";
function AuthenticatedRouter({children})
{
    const auth = useAuth();
   if(auth.isAuthenticated)
       return children;
   return <Navigate to='/login' />
}
export default  function Todo(){
    return(
   <div>
       <AuthProvider>
       <BrowserRouter>
           <HeaderComponent />
           <Routes>
               <Route path='/' element={<LoginComponent />}></Route>
               <Route path='/login' element={<LoginComponent />}></Route>
               <Route path='/welcome/:userName' element={
                   <AuthenticatedRouter>
                   <Welcome />
                       </AuthenticatedRouter>
               }></Route>
               <Route path='/error' element={<Error />}></Route>
               <Route path='/todos' element={
                   <AuthenticatedRouter>
                   <TodoComponent />
                       </AuthenticatedRouter>
               }></Route>
               <Route path='/logout' element={
                   <AuthenticatedRouter>
                   <LogOutComponent />
                       </AuthenticatedRouter>
               }></Route>
               <Route path='/*' element={<Error />}></Route>

           </Routes>
       </BrowserRouter>
       </AuthProvider>
   </div>
    )
}

function Welcome()
{
    const [message, setMessage] = useState("");
    function callRestApi()
    {
        axios.get('http://localhost:8080/hello-world-bean')
            .then(res =>setMessage(res.data))
            .catch(err => console.log(err))
            .finally(()=>console.log("callRestApi"));
    }


    const params = useParams();
    console.log(params.userName)
    return(
        <div>

            Welcome {params.userName}
            <Link to='/todos'> Your todo</Link>
            <button className="btn btn-success m-5" onClick={callRestApi}>Success</button>
            <div>{message.message}</div>
        </div>
    )
}


