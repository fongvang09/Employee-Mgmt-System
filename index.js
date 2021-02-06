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

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
// });

init();

async function init() {
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
    init() && console.table;
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
    "choices": [""]
  });

};

// "Add Employee"
async function editEmployee() {
  const employee = await inquirer.prompt({
    "type": "list",
    "message": "Please select the employee that you would like to add:",
    "name": "employee",
    "choices": ["Add an employee", "Exit"]
  });
  if (employee === "Add an employee") {
    addEmployee();
  } else {
    init();
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
      "name": "roleID"
    },
    {
      "type": "input",
      "message": "what is the manager's ID?",
      "name": "managerID"
    }
  ]);

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
    removeEmployee();
  } else {
    init();
  }
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
    init();
  }
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
    init();
  }
};

