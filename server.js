const inquirer = require("inquirer");
const mysql = require ("mysql");
const cTable = require("console.table");

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

  listDepartments() {
    const query = 'SELECT * FROM department';
    this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    })
  }

  listRoles() {
    const query = 'SELECT * FROM role';
    this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    })
  }

  listEmployees() {
    const query = 'SELECT * FROM employee';
    this.connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      this.init();
    })
  }

  addDepartment() {
    inquirer.prompt({
      type: "input",
      name: "department",
      message: "Name the new department"
    }).then((answer) => {
      const query = 'INSERT INTO department(name) VALUE (?)';
      this.connection.query(query, answer.department, (err, res) => {
        if (err) throw err;
        this.listDepartments();
        this.init();
      });
    })
  }

  addEmployee() {
    inquirer.prompt({
      type: "input",
      name: "name",
      message: "Name of employee being added"
    }).then((nameAnswer) => {
      inquirer.prompt([
        {
          type: "input",
          name: "role_id",
          message: "What is the ID of the employee's role?"
        },
        {
          type: "input",
          name: "manager_id",
          message: "What is the ID of the employee's manager?"
        }
      ]).then((answer) => {
        const [firstName, lastName] = nameAnswer.name.split(" ");
        const query = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)';
        this.connection.query(query, [firstName, lastName, answer.role_id, answer.manager_id], (err, res) => {
          if (err) throw err;
          this.addEmployee();
          this.init();
        })
      })
    })
  }
  

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
      this.connection.query(query, [answer.title, answer.salary, answer.departmentId], (err, res) => {
        if (err) throw err;
        this.listRoles();
        this.init();
      })
    })
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

const dbManager = new DatabaseManager();
dbManager.init();
