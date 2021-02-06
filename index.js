const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localHost",
    port: "3307",
    user: "root",
    password: "root",
    database: ""
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

