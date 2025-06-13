import {deleteTodoApi, getTodoApi} from "./callApi/TodoApi";
import {useEffect, useState} from "react";

export default function TodoComponent()
{
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
    function refreshTodos(username)
    {
        getTodoApi(username)
            .then(res=>
            {
                setTodos(res.data)
            })
            .catch((err)=>console.log(err));
    }
    useEffect(() => refreshTodos('in28minutes'),[])

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
                                <td><button className="btn btn-warning" onClick={()=>deleteTodo('in28minutes',todo.id)}>Delete</button></td>
                                <td><button className="btn btn-success">Update</button></td>
                            </tr>
                        )
                    )
                }

                </tbody>
            </table>
        </div>
    )
}