import {useAuth} from "./security/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {retrieveTodoApi, updateTodoApi} from "./callApi/TodoApi";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";


export default function UpdateTodoComponent()
{
    const authContext = useAuth()
    const username = authContext.username
    const {id} = useParams()
    const [description, setDescription] = useState("")
    const [targetDate, setTargetDate] = useState(new Date())
    const navigate = useNavigate();
    function retrieve()
    {
       retrieveTodoApi(username,id)
           .then(res=>
           {
               console.log(res)
               setDescription(res.data.description)
               setTargetDate(res.data.targetDate)
           })
           .catch(err=>console.log(err))
    }
    function onSubmit(values)
    {
        console.log(values)
        const todo={
            id:id,
            username: username,
            description: values.description,
            targetDate:values.targetDate,
            done:false
        }
        console.log(todo)
        updateTodoApi(username,id,todo)
            .then(()=>navigate('/todos'))
            .catch(err=>console.log(err))
    }

    function validate(values)
    {
        let errors={
            // description:"Enter a valid description",
            // targetDate: "Enter a valid targetDate",
        }
        if(values.description.length<5)
            errors.description="Please enter atleast 5 characters"
        if(values.targetDate==null)
            errors.targetDate="Please enter a valid date"
       console.log(values)
        return errors;
    }

    useEffect(()=>retrieve() , [id])
    return(
        <div className="container">
            <h1>Enter todo details:</h1>
            <Formik onSubmit={onSubmit}
                    initialValues={{description:description,targetDate:targetDate}}
                    enableReinitialize={true}
             validate={validate}
              validateOnChange={false}
            validateOnBlur={false}>
                {
                    (props)=>(
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />

                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Enter the description:</label>
                                <Field type="text" className="form-control" name="description" ></Field>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Enter the target date:</label>
                                <Field type="date" className="form-control" name="targetDate"></Field>
                            </fieldset>
                            <div><button className="btn btn-success m-5" type="submit" onClick={onSubmit}>Submit</button></div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}