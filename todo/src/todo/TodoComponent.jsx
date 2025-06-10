export default function TodoComponent()
{
    const date = new Date()
    const today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    const todos = [{id:1,description:'Learn AWS',isDone:false,targetDate:today},
        {id:2,description:'Learn Spring ',isDone:true,targetDate:today},]
    return(
        <div className="container">
            <table className="table">
                <thead>
                <tr><td> id </td>
                    <td> description </td>
                    <td> Done</td>
                    <td>Target Date</td></tr>

                </thead>
                <tbody>
                {
                    todos.map(
                        todo=>(
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.description}</td>
                                <td>{todo.isDone.toString()}</td>
                                <td>{todo.targetDate.toDateString()}</td>
                            </tr>
                        )
                    )
                }

                </tbody>
            </table>
        </div>
    )
}