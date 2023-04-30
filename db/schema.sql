-- Drops the inventory_db if it exists currently --
DROP DATABASE IF EXISTS employeetracker_db;

-- Creates the inventory_db database --
CREATE DATABASE employeetracker_db;

-- use employeetracker_db database --
USE employeetracker_db;

-- Creates employee table --
CREATE TABLE employee(
	id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

-- Creates role table --
CREATE TABLE role(
	id INT AUTO_INCREMENT NOT NULL,
	title VARCHAR(30) NOT NULL,
  salary DECIMAL(7,0) NOT NULL,
  department_id INT NOT NULL,
    PRIMARY KEY (id)
);
-- Creates department table --
CREATE TABLE department(
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);


