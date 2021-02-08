const mysql = require("mysql");
const inquirer = require("inquirer");
const questions = ([
  {
    "type": "list",
    "message": "What would you like to do?",
    "name": "action",
    "choices": [
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "View All Roles"
    ]
  }
]);

var connection = mysql.createConnection({
  host: "localHost",
  port: "3307",
  user: "root",
  password: "root",
  database: "employeeDB"
});

connection.connect(function (err) {
  // if (err) throw err;
  mainMenu();
});

async function mainMenu() {
  const { action } = await inquirer.prompt(questions);
  switch (action) {
    case "View All Employees By Department":
      viewDepartments();
      break;
    case "View All Employees By Manager":
      viewManager();
      break;
    case "Add Employee":
      editEmployee();
      break;
    case "Remove Employee":
      removeEmployee();
      break;
    case "Update Employee Role":
      editRole();
      break;
    case "Update Employee Manager":
      editManager();
      break;
    case "View All Roles":
      viewAll();
      break;
    default:
      break;
  }
};

// "View All Employees By Department"
async function viewDepartments() {
  const department = await inquirer.prompt({
    "type": "list",
    "message": "Select what you would like to do:",
    "name": "department",
    "choices": ["Return"]
  });
  if (department === "Return") {
    mainMenu()
  } else {
    "Error"
  }
};

// "View All Employees By Manager"
async function viewManager() {
  const manager = await inquirer.prompt({
    "type": "list",
    "message": "Select what you would like to do:",
    "name": "manager",
    "choices": ["View", "Return"]
  });
  if (manager === "View") {
    var query = "SELECT first_name, last_name, role_id, manager_id FROM employeeDB WHERE ?";
    console.log(add);
    app.get('/', function (err, res) {
      if (err) throw err;
      // console.table(res);
      console.log(res.affectedRows + "Employee Added\n");
      mainMenu();
    });
  }
};

// "Add Employee"
async function editEmployee() {
  const { employee } = await inquirer.prompt({
    "type": "list",
    "message": "Please select the employee that you would like to add:",
    "name": "employee",
    "choices": ["Add an employee", "Return"]
  });
  if (employee === "Add an employee") {
    addEmployee();
  } else {
    mainMenu();
  }
};

async function addEmployee() {
  const add = await inquirer.prompt([
    {
      "type": "input",
      "message": "What is the employee's first name?",
      "name": "firstName"
    },
    {
      "type": "input",
      "message": "What is the employee's last name?",
      "name": "lastName"
    },
    {
      "type": "input",
      "message": "What is the employee's role ID?",
      "name": "roleID",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(" (Please enter a valid number)")
        return false;
      }
    },
    {
      "type": "input",
      "message": "what is the manager's ID?",
      "name": "managerID",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(" (Please enter a valid number)")
        return false;
      }
    }
  ])
  // .then(function (answer) {
  //   var query = "INSERT INTO id, first_name, last_name, role_id, manager_id FROM employeeDB WHERE ?";
  //   connection.query(query, { name: answer.firstName }, function (err, res) {
  //     for (var i = 0; i < res.length; i++) {
  //       console.table("ID: " + res[i].id + " first_name: " + res[i].firstName + " last_name: " + res[i].lastName + " title: " + res[i].title);
  //     }
  //     console.log(answer);
  //     mainMenu();
  //   });
  // });
  const query = await connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: add.firstName,
      last_name: add.lastName,
      role_id: add.roleID,
      manager_id: add.managerID
    },
    console.log(add));
  app.get('/', function (err, res) {
    if (err) throw err;
    // console.table(res);
    console.log(res.affectedRows + "Employee Added\n");
    mainMenu();
  })
};

// "Remove Employee"
async function removeEmployee() {
  const employee = await inquirer.prompt({
    "type": "list",
    "message": "Who would you like to remove?",
    "name": "employee",
    "choices": ["Remove an employee", "Return"]
  });
  if (employee === "Remove an employee") {
    remEmployee();
  } else {
    mainMenu();
  }
};

async function remEmployee() {
  connection.query(
    "SELECT first_name AS firstName, last_name AS lastName FROM employee",
    async function (err, employees) {
      const data = await inquirer.prompt([
        {
          "type": "list",
          "message": "Which employee do you want to remove?",
          "name": "employees",
          "choices": employees.map((employee) => ({
            name: employee.firstName + " " + employee.lastName
          })
          )
        }
      ]);
    }
  )
};

// "Update Employee Role"
async function editRole() {
  const role = await inquirer.prompt({
    "type": "list",
    "message": "What would you like to do?",
    "name": "role",
    "choices": ["Add a role", "Remove a role", "Return"]
  });
  if (role === "Add a role") {
    addRole();
  } else if (role === "Remove a role") {
    removeRole();
  } else {
    mainMenu();
  }
};

async function addRole() {
  const role = await inquirer.prompt({
    "type": "list",
    "message": "Select a role that you would like to add:",
    "name": "role",
    "choices": ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"]
  });
  const query = await connection.query(
    "INSERT INTO role SET ?",
    {
      title: role.title,
      salary: role.salary,
      department_id: role.department_id,
    },
    console.log(add));
  app.get('/', function (err, res) {
    if (err) throw err;
    // console.table(res);
    console.log(res.affectedRows + "Role Added\n");
    mainMenu();
  })
};

async function removeRole() {
  const role = await inquirer.prompt({
    "type": "list",
    "message": "Select a role that you would like to remove:",
    "name": "removeRole",
    "choices": ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"]
  });
  const query = await connection.query(
    "INSERT INTO role SET ?",
    {
      title: role.title,
      salary: role.salary,
      department_id: role.department_id,
    },
    console.log(add));
  app.get('/', function (err, res) {
    if (err) throw err;
    // console.table(res);
    console.log(res.affectedRows + "Role Removed\n");
    mainMenu();
  })
};

// "Update Employee Manager"
async function editManager() {
  const manager = await inquirer.prompt({
    "type": "list",
    "message": "What would you like to do?",
    "name": "manager",
    "choices": ["Add a manager", "Remove a manager", "Return"]
  });
  if (manager === "Add a manager") {
    addManager();
  } else if (manager === "Remove a manager") {
    removeManager();
  } else {
    mainMenu();
  }
};


// "View All Roles"
async function viewAll() {
  const { viewTable } = await inquirer.prompt({
    "type": "list",
    "message": "Select one of the following:",
    "name": "viewTable",
    "choices": ["Employees", "Departments", "Roles", "Return"]
  });
  if (viewTable === "Employees") {
    var query = `SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?`;
  } else if (viewTable === "Departments") {
    query = `SELECT name FROM department WHERE ?`;
  } else if (viewTable === "Roles") {
    query = `SELECT title, salary, department_id FROM role WHERE ?`;
  } else (viewTable === "Return"); {
    mainMenu();
  }
  const data = await connection.query(query);
  console.table(data);
  mainMenu();
};