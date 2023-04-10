package net.suki2.demo.repository;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import net.suki2.demo.entity.TodoItem;

public interface TodoItemRepository extends PagingAndSortingRepository<TodoItem, Long>, ListCrudRepository<TodoItem, Long> {
	/**
	 * @param name
	 * @return List<TodoItem>
	 */
	List<TodoItem> findByName(@Param("name") String name);
	/**
	 * @param name
	 * @return List<TodoItem>
	 */
	List<TodoItem> findByStatus(@Param("status") long status);
}
