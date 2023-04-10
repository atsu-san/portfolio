package net.suki2.demo.entity;

import java.sql.Timestamp;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Data;

@Data
public class Auditable {

	@CreatedBy
	private String createdBy;
	
	@CreatedDate
	private Timestamp createdAt;
	
	@LastModifiedBy
	private String updatedBy;
	
	@LastModifiedDate
	private Timestamp updatedAt;

}
