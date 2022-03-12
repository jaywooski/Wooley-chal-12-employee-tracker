const inquirer = require('inquirer');
const { viewDepartments, addDept } = require('./js/department');
const { addEmployee, viewEmployees, employeePrompt, updateEmployeeRole } = require('./js/employee');
const mysql = require('mysql2');


function startPrompt() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager',
                'View employees by department',
                // 'View the total utilized budget of a department',
                'Add a role',
                'Add a department',
                'Add an employee',
                'Delete a department',
                'Update employee managers',
                'Update an employee role'
            ]
        }
    ])
    .then((data) => {
        const choice = data;
        switch (choice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':

                break;
            case 'View all employees':

                break; 
            case 'View employees by manager':

                break;
            case 'View employees by department':

                break;
            case 'Add a role':

                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'View all roles':

                break;
            case 'Delete a department':

                break;
            case 'Update employee managers':

                break;
            case 'Update an employee role':
                
                break;

        
            default:
                break;
        }
    })
}

startPrompt();