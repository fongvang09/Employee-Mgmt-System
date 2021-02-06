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
  const {action} = await inquirer.prompt(questions);
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

