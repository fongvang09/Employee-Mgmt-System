DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NULL,
	PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT NOT NULL auto_increment,
    title VARCHAR(30) NULL,
    salary INTEGER(10) NOT NULL,
    department_id INTEGER(10),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10) NULL,
    PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;