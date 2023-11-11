const inquirer = require('inquirer');
const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes");
const sequelize = require("./config/connection")
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'zxp3sazz',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);


function choices() {
  inquirer.prompt([
    {
      type: "list",
      message: "Choose an option:",
      name: "optionPicked",
      choices: ["View departments", "View roles", "View employees", "Add department", "Add role", "Add employee", "Update employee's role"],
    }
  ]) .then(function(results) {
    //if else statements here
  })
}



function viewDepartments() {
  app.get('/api/departments', (req, res) => {
    const view = `SELECT * FROM department`;

    db.query(view, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
}
function viewRoles() {
  app.get('/api/roles', (req, res) => {
    const view = `SELECT * FROM roles`;

    db.query(view, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
}
function viewEmployees() {
  app.get('/api/employees', (req, res) => {
    const view = `SELECT * FROM employees`;

    db.query(view, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
}



function addDepartments() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new department:",
      name: "name",
    }
  ]).then ((answers) => {
    app.post('/api/new-department', ({ body }, res) => {
      const insert = `INSERT INTO department (name)
        VALUES (?)`;
      const params = [body.name];
      
      db.query(insert, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body
        });
      });
    });
  })
    
    // function(results) {
    // db.query(`INSERT INTO department (name)
    // VALUES (?)`, [results.newName], function(err, res){
    //   if (err) {
    //     res.status(400).json({ error: err.message });
    //     return;
    //   }
    // })



}
function addRoles() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the title of the new role:",
      name: "title",
    },
    {
      type: "number",
      message: "Enter the salary of the new role:",
      name: "salary",
    },
    {
      type: "number",
      message: "Enter the department_id of the new role:",
      name: "department_id",
    }
  ])

  app.post('/api/new-role', ({ body }, res) => {
    const insert = `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];
    
    db.query(insert, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });
}
function addEmployees() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the first name of the new employee:",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter the last name of the new employee:",
      name: "last_name",
    },
    {
      type: "number",
      message: "Enter the role_id of the new employee:",
      name: "role_id",
    },
    {
      type: "number",
      message: "Enter the manager_id of the new employee (if any):",
      name: "manager_id",
    }
  ])

  app.post('/api/new-employee', ({ body }, res) => {
    const insert = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    
    db.query(insert, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });
}



function updateEmployeeRole() {
  
}