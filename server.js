// Import necessary dependencies
const inquirer = require("inquirer");
const mysql = require ("mysql");
const consoleTable = require("console.table");

// Create a class to manage the database connection and queries
class DatabaseManager {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Braylin77play!",
      database: "employeetracker_db"
    });
  }

 // Function to list all departments
  listDepartments() {
    const query = 'SELECT * FROM department';
    this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    })
  }

    // Function to list all roles
  listRoles() {
    const query = 'SELECT * FROM role';
    // Execute the query and log the results to the console as a table
    this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    })
  }

 // Function to list all employees
  listEmployees() {
    const query = 'SELECT * FROM employee';
    // Execute the query and log the results to the console as a table
    this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    })
  }

  // Function to add a new department to the database

  addDepartment() {
    inquirer.prompt({
      type: "input",
      name: "department",
      message: "Name the new department"
    }).then((answer) => {
      const query = 'INSERT INTO department(name) VALUE (?)';
      this.connection.query(query, answer.department, (err, res) => {
        if (err) throw err;
        this.addDepartment();
        this.init();
      });
    })
  }
  
  // Function to add a new employee to the database

  addEmployee() {
    inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name"
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name"
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the employee's role id"
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the employee's manager id"
      }
    ]).then((answer) => {
      const query = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)';
      const values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
      this.connection.query(query, values, (err, res) => {
        if (err) throw err;
        this.addEmployee();
        this.init();
      });
    });
  }
    
  // Function to add a roll to the database

  addRole() {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Supply a desired title for the new role"
      },
      {
        type: "input",
        name: "salary",
        message: "What salary for the title? Please give a number no more than 7 digits"
      },
      {
        type: "input",
        name: "departmentId",
        message: "What is the department ID number?"
      }
    ]).then((answer) => {
      const query = 'INSERT INTO role(title, salary, department_id) VALUE (?, ?, ?)';
      const values = [answer.title, answer.salary, answer.departmentId]
      this.connection.query(query, values, (err, res) => {
        if (err) throw err;
        this.addRole();
        this.init();
      })
    })
  }

  updateEmployeeRole() {
    inquirer.prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee whose role you want to update"
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the ID of the new role"
      }
    ]).then((answer) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      const values = [answer.roleId, answer.employeeId];
      this.connection.query(query, values, (err, res) => {
        if (err) throw err;
        console.log(`Updated employee ${answer.employeeId} to new role ${answer.roleId}`);
        this.init();
      });
    });
  }
  

  init() {
    inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit"
        ]
      }
       // Use a switch statement to determine what action the user has selected
      //  Call the appropriate function
    ]).then((answer) => {
      switch (answer.action) {
        case "View all departments":
          this.listDepartments();
          break;
        case "View all roles":
          this.listRoles();
          break;
        case "View all employees":
          this.listEmployees();
          break;
        case "Add a department":
          this.addDepartment();
          break;
        case "Add a role":
          this.addRole();
          break;
        case "Add an employee":
          this.addEmployee();
          break;
        case "Update an employee role":
          this.updateEmployeeRole();
          break;
        case "Exit":
          this.connection.end();
          break;
      }
    });
  }
}
// Create an instance of the "DatabaseManager" class
//  call its "init" to start the application
const dbManager = new DatabaseManager();
dbManager.init();
