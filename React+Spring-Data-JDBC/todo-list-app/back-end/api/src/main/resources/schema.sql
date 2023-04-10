-- CREATE DATABASE demo;

-- CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';

-- GRANT ALL PRIVILEGES ON DATABASE demo TO postgres;

CREATE TABLE IF NOT EXISTS demo_todo_list (
	id SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	type SMALLINT NOT NULL, -- 0: Work, 1: Home, 2: Others
	status SMALLINT NOT NULL, -- 0: Not done, 1: Done
	start_at TIMESTAMP, -- Scheduled start time
	end_at TIMESTAMP, -- Scheduled end time
	created_at TIMESTAMP, 
	created_by VARCHAR(255), 
	updated_at TIMESTAMP,
	updated_by VARCHAR(255),
	PRIMARY KEY (id)
);