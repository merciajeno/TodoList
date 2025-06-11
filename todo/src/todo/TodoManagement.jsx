import './TodoApp.css'
import {BrowserRouter, Routes, Route, useParams, Link, Navigate} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import LoginComponent from "./LoginComponent";
import TodoComponent from "./TodoComponent";
import LogOutComponent from "./LogOutComponent";
import Error from "./Error";
import AuthProvider, {useAuth} from "./security/AuthContext"

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
    const params = useParams();
    console.log(params.userName)
    return(
        <div>

            Welcome {params.userName}
            <Link to='/todos'> Your todo</Link>
        </div>
    )
}


