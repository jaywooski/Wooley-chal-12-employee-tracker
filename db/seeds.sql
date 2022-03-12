
INSERT INTO department
    (dept_name)
VALUES
    ('Business')
    ('Legal')
    ('Cleaning')


INSERT INTO roles
    ( title, salary, department_id)
    ('Lawyer', 200000, 2),
    ('Assistant', 50000, 2),
    ('Secretary', 47000, 1),
    ('Manager', 65000, 3),
    ('Stockbroker', 120000, 1),
    ('Janitor', 40000, 3)



INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Law', 1, 3 ),
    ('Sarah', 'Efforts', 5, 3 ),
    ('Bob', 'Dillan', 4, null)