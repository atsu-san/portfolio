package net.suki2.demo.controller;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.suki2.demo.entity.TodoItem;
import net.suki2.demo.repository.TodoItemRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class TodoItemController {
	
	private TodoItemRepository todos;
	
	public TodoItemController(TodoItemRepository todos) {
		this.todos = todos;
	}

	@GetMapping("/todos")
	public List<TodoItem> getTodos(){
		Sort sort = Sort.by(Direction.ASC, "id");
		return (List<TodoItem>) todos.findAll(sort);
	}
	
	@GetMapping("/todos/{id}")
	public TodoItem getTodoById(@PathVariable long id) {
		return todos.findById(id).orElse(null);
	}
	
	@GetMapping(value = "/todos", params = "name")
	public List<TodoItem> getTodoByName(@RequestParam String name) {
		return todos.findByName(name);
	}
	
	@GetMapping(value = "/todos", params = "status")
	public List<TodoItem> getTodoByName(@RequestParam long status) {
		return todos.findByStatus(status);
	}
	
	@PostMapping("/todos")
	public String saveTodo(@RequestBody TodoItem todoItem) {
		return "Saved: " + todos.save(todoItem).toString();
	}

	@PutMapping("/todos/{id}")
	public String updateTodo(@RequestBody TodoItem todoItem, @PathVariable long id) {
		TodoItem todoInDb;
		try {
			todoInDb = todos.findById(id).orElseThrow();
		} catch (Exception e) {
			return "Todo not found";
		}
		todoItem.setId(id);
		todoItem.setCreatedAt(todoInDb.getCreatedAt());
		todoItem.setCreatedBy(todoInDb.getCreatedBy());
		return "Updated: " + todos.save(todoItem).toString();
	}
	
	@DeleteMapping("/todos/{id}")
	public String deleteTodoById(@PathVariable long id) {
		if (todos.findById(id).isPresent()) {
			todos.deleteById(id);
			return "Deleted.";
		} else {
			return "Todo not found.";
		}
	}
}
