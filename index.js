const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
const questions = ([
  {
    "type": "list",
    "message": "What would you like to do?",
    "name": "action",
    "choices": [
      "View All Employees By Department",
      "Edit Employee",
      "Update Employee Role",
      "View All Roles",
      "Exit"
    ]
  }
]);

var connection = mysql.createConnection({
  host: "localHost",
  port: "3306",
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
      viewEmployees();
      break;
    case "Edit Employee":
      editEmployee();
      break;
    case "Update Employee Role":
      editRole();
      break;
    case "View All Roles":
      viewAll();
      break;
    case "Exit":
      exit();
      break;
    default:
      return quit();
  }
};

// "View All Employees By Department"
function viewEmployees() {
  connection.query("SELECT * FROM employee", function (error, res) {
    if (error) throw error;
   // console.log(res);
    console.table(res);
    mainMenu()
  });
}

// "Add Employee"
async function editEmployee() {
  const { employee } = await inquirer.prompt({
    "type": "list",
    "message": "Please select the employee that you would like to add:",
    "name": "employee",
    "choices": ["Add an employee", "Remove an employee", "Return"]
  });
  if (employee === "Add an employee") {
    addEmployee();
    if (employee === "Remove an employee") {
      removeEmployee();
    } else if (employee.employee === "Return") {
      mainMenu()
    }
  };
}

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
      validate: (value) => {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(" (Please enter a valid number)");
        return false;
      }
    },
    {
      "type": "input",
      "message": "What is the manager's ID?",
      "name": "managerID",
      validate: (value) => {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(" (Please enter a valid number)");
        return false;
      }
    }
  ]);
  switch (add.managerID) {
    case true:
      add.managerID = 1;
      break;
    case false:
      add.managerID = null;
      break;
  }
  console.log(add)
  const query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: add.firstName,
      last_name: add.lastName,
      role_id: add.roleID,
      manager_id: add.managerID
    }, (err, res) => {
      if (err)
        throw err;
      // console.table(res);
      console.log(`${res.affectedRows}Employee Added`);
      mainMenu();
    }
  );
  console.table(add);
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
    async (err, employees) => {
      const data = await inquirer.prompt([
        {
          "type": "list",
          "message": "Which employee do you want to remove?",
          "name": "employees",
          "choices": employees.map((employee) => ({
            name: `${employee.firstName} ${employee.lastName}`
          })
          ),
        },
      ]);
      console.log(data);
      const firstAndLast = data.employees.split(" ");
      console.log(firstAndLast[1]);
      connection.query(
        "DELETE FROM employee WHERE first_name = ? AND last_name = ?",
        [firstAndLast[0], firstAndLast[1]]
      );
      mainMenu();
    }
  );
}

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
  const query = connection.query(
    "INSERT INTO role SET ?",
    {
      title: role.title,
      salary: role.salary,
      department_id: role.department_id,
    },
    console.log(add));
  app.get('/', (err, res) => {
    if (err)
      throw err;
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
  const query = connection.query(
    "INSERT INTO role SET ?",
    {
      title: role.title,
      salary: role.salary,
      department_id: role.department_id,
    },
    console.log(add));
  app.get('/', (err, res) => {
    if (err)
      throw err;
    // console.table(res);
    console.log(`${res.affectedRows}Role Removed`);
    mainMenu();
  })
};

// "View All Roles"
function viewAll() {
  connection.query("SELECT * FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id", function (error, res) {
    if (error) throw error;
   // console.log(res);
    console.table(res);
    mainMenu()
  });
  // inquirer.prompt({ }).then(res => console.log(res) ).catch();
}

function exit() {
  process.exit();
}