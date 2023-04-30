-- Depratments --
INSERT INTO department(name)
VALUES ('Human Resources'),
       ('Telemarketing'),
       ('Marketing'),
       ('Production'),
       ('Graphic Design'),
       ('Finance');

-- Finance roles --
INSERT INTO role(title, salary, department_id)
VALUES 
  ("Financial Advisor", 18000, 00),
  ("Financial Assistant", 13000, 00),
  ("Financial Head", 20000, 00),
  ("Financial Trainee", 10000, 00),
  ("Financial Employee", 14000, 00),
  ("Financial Director", 19000, 00),
-- Graphic Design roles --
  ("Graphic Design Advisor", 18000, 01),
  ("Graphic Design Assistant", 13000, 01),
  ("Graphic Design Head", 20000, 01),
  ("Graphic Design Trainee", 10000, 01),
  ("Graphic Design Employee", 14000, 01),
  ("Graphic Design Director", 19000, 01),
--   Production Roles --
  ("Prouction Advisor", 19000, 02),
  ("Production  Assistant", 12000, 02),
  ("Production Head", 24000, 02),
  ("Production Trainee", 11000, 02),
  ("Production Employee", 15000, 02),
  ("Production Director", 21000, 02),
--   Marketing Roles --
  ("Marketing Head", 18000, 03),
  ("Marketing Assistant", 13000, 03),
  ("Marketing Trainee", 20000, 03),
  ("Marketing Employee", 10000, 03),
  ("Marketing Director", 14000, 03),
--   Telemarkting Roles --
  ("Telemarketing Head", 18000, 03),
  ("Telemarketing Assistant", 13000, 03),
  ("Telemarketing Trainee", 20000, 03),
  ("Telemarketing Employee", 10000, 03),
  ("Telemarketing Director", 14000, 03),
--  Human Resource Roles  --
  ("Human Resource Head", 18000, 04),
  ("Human Resource Assistant", 13000, 04),
  ("Human Resource Trainee", 20000, 04),
  ("Human Resource Employee", 10000, 04),
  ("Human Resource Director", 14000, 04);

-- ----------- Employees -------------- 
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Stans', 1, 4),
       ('Alexa', 'Stine', 2, 5),
       ('Derrick', 'Flinks', 4, 3),
       ('Tamera', 'Trish', 5, 5),
       ('Able', 'Hickens', 6, 5),
       ('Swish', 'Loves', 7, 3),
       ('Plicks', 'Stew', 1, 5),
       ('Donald', 'Creeds', 4, 5);

