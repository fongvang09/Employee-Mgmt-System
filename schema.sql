DROP DATABASE IF EXISTS top_albums;
CREATE DATABASE top_albums;
USE top_albums;

-- CREATE TABLE department (
--   id INT PRIMARY KEY,
--   first_name VARCHAR(30),
--   last_name VARCHAR(30),
--   title VARCHAR(30),
--   department VARCHAR(30),
--   salary INTEGER(10),
--   manager VARCHAR(30),
--   PRIMARY KEY (id)
-- );

-- INSERT INTO department (first_name, last_name, title, department, salary, manager)
-- VALUES ("")

CREATE TABLE department (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(30),
	PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT PRIMARY KEY auto_increment,
    title VARCHAR(30),
    salary VARCHAR(30),
    department_id VARCHAR(30),
	PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INT PRIMARY KEY auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(30),
    manager_id VARCHAR(30),
    PRIMARY KEY(id)
);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;