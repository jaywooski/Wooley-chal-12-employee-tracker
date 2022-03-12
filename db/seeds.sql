
INSERT INTO department
    (id, name)
VALUES
    (1, 'Business')
    (2, 'Legal')
    (3, 'Cleaning')


INSERT INTO roles
    (id, title, salary, department_id)
VALUES
    (1, 'Lawyer', 200000, 2),
    (2, 'Assistant', 50000, 2),
    (3, 'Secretary', 47000, 1),
    (4, 'Manager', 65000, 3),
    (5, 'Stockbroker', 120000, 1),
    (6, 'Janitor', 40000, 3)



INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Law', 1, 3 ),
    (2, 'Sarah', 'Efforts', 5, 3 ),
    (3, 'Bob', 'Dillan', 4, null)