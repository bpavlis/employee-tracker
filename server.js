const inquirer = require('inquirer');
const express = require("express");
const path = require("path");
const app = express();
// const routes = require("./routes");
// const sequelize = require("./config/connection")
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


function start() {
  inquirer.prompt([
    {
      type: "list",
      message: "Choose an option:",
      name: "optionPicked",
      choices: ["View departments", "View roles", "View employees", "Add department", "Add role", "Add employee", "Update employee's role"],
    }
  ]).then(function (results) {
    //if else statements here
    if (results.optionPicked === "View departments") {
      viewDepartments()
    } else if (results.optionPicked === "View roles") {
      viewRoles()
    } else if (results.optionPicked === "View employees") {
      viewEmployees()
    } else if (results.optionPicked === "Add department") {
      addDepartments()
    } else if (results.optionPicked === "Add role") {
      addRoles()
    } else if (results.optionPicked === "Add employee") {
      addEmployees()
    } else if (results.optionPicked === "Update employee's role") {
      updateEmployeeRole()
    } else {
      db.end();
    }
  })
}


function viewDepartments() {
  const view = `SELECT * FROM department`;
  db.query(view, (err, res) => {
    console.table(res)
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
  });
}


function viewRoles() {
  const view = `SELECT * FROM role`;
  db.query(view, (err, res) => {
    console.table(res)
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
  });
}


function viewEmployees() {
  const view = `SELECT * FROM employee`;
  db.query(view, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    return console.table(res)
  });
}


function addDepartments() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new department:",
      name: "newName",
    }
  ]).then((result) => {
    db.query(`INSERT INTO department (name) VALUES (?)`, [result.newName], (err, res) => {
      console.table(viewDepartments())
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    });
  });
}


function addRoles() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the title of the new role:",
      name: "newTitle",
    },
    {
      type: "number",
      message: "Enter the salary of the new role:",
      name: "newSalary",
    },
    {
      type: "number",
      message: "Enter the department_id of the new role:",
      name: "newDepartment_id",
    }
  ]).then((result) => {

    db.query(`INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`, [result.newTitle, result.newSalary, result.newDepartment_id], (err, res) => {
      console.table(viewRoles())
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    });
  });
}


function addEmployees() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the first name of the new employee:",
      name: "newFirst_name",
    },
    {
      type: "input",
      message: "Enter the last name of the new employee:",
      name: "newLast_name",
    },
    {
      type: "number",
      message: "Enter the role_id of the new employee:",
      name: "newRole_id",
    },
    {
      type: "number",
      message: "Enter the manager_id of the new employee (enter null if none):",
      name: "newManager_id",
    }
  ]).then((result) => {

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`, [result.newFirst_name, result.newLast_name, result.newRole_id, result.newManager_id], (err, res) => {
      console.table(viewRoles())
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    });
  });
}


function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the id of the employee to be updated:",
      name: "updatedEmployee"
    },
    {
      type: "input",
      message: "Enter the change in role_id:",
      name: "updatedRole"
    }
  ]).then((result) => {
    // const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    // const params = [req.body.review, req.params.id];

    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [result.updatedRole, result.updatedEmployee], (err, res) => {
      console.table(viewEmployees())
      if (err) {
        res.status(400).json({ error: err.message });
      }
    });
  });
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

start();