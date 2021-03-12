USE employeeDB;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Chan", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ashley", "Rodriguez", 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Tupik", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Malia", "Brown", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Lourd", 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Allen", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Christian", "Eckenrode", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Leeroy", "Jenkins", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Harry", "Potter", 4, 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
# SELECT (fields) FROM (table)
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.department_id, department.name FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;

