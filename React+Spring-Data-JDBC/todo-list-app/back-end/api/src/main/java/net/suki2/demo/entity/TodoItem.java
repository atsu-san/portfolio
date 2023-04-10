package net.suki2.demo.entity;

import java.sql.Timestamp;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table("demo_todo_list")
@Data
@EqualsAndHashCode(callSuper=true)
@AllArgsConstructor
@NoArgsConstructor
public class TodoItem extends Auditable {

	@Id
	private long id;
	private String name;
	private Integer type;
	private Integer status;
	private Timestamp startAt;
	private Timestamp endAt;

}
