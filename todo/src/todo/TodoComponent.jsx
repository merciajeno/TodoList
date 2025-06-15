import {deleteTodoApi, getTodoApi} from "./callApi/TodoApi";
import {useEffect, useState} from "react";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

export default function TodoComponent()
{
    const username = useAuth().username;
    const navigate = useNavigate();
    const [todos,setTodos] = useState([])
    function deleteTodo(username,id)
    {
        console.log('deleted'+id)
        deleteTodoApi(username,id)
            .then(
                (res)=>{

                    refreshTodos(username)
                    console.log(res)
                }
            )
            .catch(err=>console.log(err));
    }

   function updateTodo(id)
   {
       console.log('update '+id)
       navigate(`/updateTodo/${id}`)
   }
  function addTodo()
  {
      console.log('clic')
      navigate('/updateTodo/-1')
  }
    function refreshTodos(username)
    {
        getTodoApi(username)
            .then(res=>
            {
                setTodos(res.data)
            })
            .catch((err)=>console.log(err));
    }
    useEffect(() => refreshTodos(username),[])
    return(
        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <td> description </td>
                    <td> Done</td>
                    <td>Target Date</td>
                    <td>Delete</td>
                    <td>Update</td>
                </tr>
                </thead>
                <tbody>
                {
                    todos.map(
                        todo=>(
                            <tr key={todo.id}>

                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toString()}</td>
                                <td><button className="btn btn-warning" onClick={()=>deleteTodo(username,todo.id)}>Delete</button></td>
                                <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                            </tr>
                        )
                    )
                }

                </tbody>
            </table>
            <div>
                <button className="btn btn-success m-5" onClick={addTodo}>Add new todo</button>
            </div>
        </div>
    )
}