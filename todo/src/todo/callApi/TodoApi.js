import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getTodoApi = (username)=>apiClient.get(`/${username}/getTodos`)

export const deleteTodoApi = (username,id)=>apiClient.delete(`/${username}/deleteTodo/${id}`)