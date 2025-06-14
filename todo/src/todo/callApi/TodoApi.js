import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getTodoApi = (username)=>apiClient.get(`/${username}/getTodos`)

export const deleteTodoApi = (username,id)=>apiClient.delete(`/${username}/deleteTodo/${id}`)

export const retrieveTodoApi = (username,id)=>apiClient.get(`/${username}/todo/${id}`)

export const updateTodoApi = (username,id,todo)=>apiClient.get(`/${username}/updateTodo/${id}`,todo)