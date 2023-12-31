INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3),
       ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4);

INSERT INTO  employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Mike", "Johnson", 1, 1),
       ("Jared", "Smith", 2, null),
       ("Ben", "Peterson", 2, 3),
       ("Maya", "White", 3, null),
       ("Justin", "Fields", 3, 5),
       ("Darnell", "Mooney", 4, null),
       ("DJ", "Moore", 4, 7);



