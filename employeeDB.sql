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
    salary DECIMAL NOT NULL,
    department_id INTEGER(10) REFERENCES department.id,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INTEGER(10) REFERENCES role.id,
    manager_id INTEGER(10),
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;