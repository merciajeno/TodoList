package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}
