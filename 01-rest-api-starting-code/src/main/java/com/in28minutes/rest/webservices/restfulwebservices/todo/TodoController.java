package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {

	@Autowired
	private TodoService todoService;
	
	@GetMapping("/{username}/getTodos")
	public List<Todo> getTodos(@PathVariable String username)
	{
		return todoService.findByUsername(username);
	}
	
	@DeleteMapping("/{username}/deleteTodo/{id}")
	public void deleteTodo(@PathVariable String username, @PathVariable int id)
	{
		todoService.deleteById(id);
	}
	
	@GetMapping("/{username}/todo/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable int id)
	{
		return todoService.findById(id);
	}
	
	@PutMapping("/{username}/updateTodo/{id}")
	public Todo updateTodo(@PathVariable String username,@PathVariable int id,@RequestBody Todo todo)
	{
		todoService.updateTodo(todo);
		return todo;
	}
	
	@PostMapping("/{username}/addTodo")
	public Todo createTodo(@PathVariable String username,@RequestBody Todo todo)
	{
		Todo createdTodo = todoService.addTodo(username,todo.getDescription(),todo.getTargetDate(),todo.isDone());
		return createdTodo;
	}
}
