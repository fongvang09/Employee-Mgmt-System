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
//   mainMenu();
// });

// function mainMenu() {
//   queryURL = `SELECT song FROM top5000 WHERE artist = ''`;
//   queryURL = 'SELECT artist, COUNT(song) AS songCount FROM top5000 GROUP by artist HAVING songCount > 1 ORDER by soundCount DESC';
//   queryURL = `SELECT song, position FROM top5000 WHERE (position BETWEEN 100 and 200);`;

//   console.log(queryURL);
//   connection.query(queryURL, function(err, res) {
//       if (err) throw err;
//       console.table(res);
//       Exit();
//   });
// }

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
    case "View Info":
      viewInfo();
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
    init()
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
  const {employee} = await inquirer.prompt({
    "type": "list",
    "message": "Please select the employee that you would like to add:",
    "name": "employee",
    "choices": ["Add an employee", "Return"]
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
  const query = await connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: add.firstName,
      last_name: add.lastName,
      role_id: add.roleID,
      manager_id: add.managerID
    },
    function (err, res) {
      // if (err) throw err;
      console.log(res.affectedRows + "Employee Added\n");
      init();
    }
  )
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

async function removeEmployee() {
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
        )}
      ])
    }
  )
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

// function Exit() {
//   connection.end();
// }

async function viewInfo() {
  const {viewTable} = await inquirer.prompt({
    "type": "list",
    "message": "Select one of the following:",
    "name": "viewTable",
    "choices": ["Employees", "Departments", "Roles"]
  });
  if (viewTable === "Employees") {
    query = `SELECT employee.first_name, employee.last_name AS department FROM (
      (employee INNER JOIN role ON employee.role_id)
      INNER JOIN department ON role.department_id = department.id)
      ORDER by department`;
  } else if (viewTable === "Departments") {
    query = `SELECT name FROM department`
  } else if (viewTable === "Roles") {
    query = `SELECT role.title, role.department_id AS id, department.dept AS department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC`;
  }
  const data = await connection.query(query);
  console.table(data);
  init();
}