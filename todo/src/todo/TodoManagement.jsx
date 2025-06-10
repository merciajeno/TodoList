import './TodoApp.css'
import {BrowserRouter, Routes, Route, useParams, Link} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import LoginComponent from "./LoginComponent";
import TodoComponent from "./TodoComponent";
import LogOutComponent from "./LogOutComponent";
import Error from "./Error";

export default  function Todo(){
    return(
   <div>
       <p>Hello Mercia</p>

       <BrowserRouter>
           <HeaderComponent />
           <Routes>
               <Route path='/login' element={<LoginComponent />}></Route>
               <Route path='/welcome/:userName' element={<Welcome />}></Route>
               <Route path='/error' element={<Error />}></Route>
               <Route path='/todos' element={<TodoComponent />}></Route>
               <Route path='/logout' element={<LogOutComponent />}></Route>
               <Route path='/*' element={<Error />}></Route>

           </Routes>
       </BrowserRouter>
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


