const inquirer = require('inquirer');


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
                'View the total utilized budget of a department',
                'Add a role',
                'Add a department',
                'Add an employee',
                'Delete a department',
                'Update employee managers',
                'Update an employee role'
            ]
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "Which manager?",
            choices: [],
            when: (answer) => answer.action == 'View employees by manager'
        },
        {
            type: 'list',
            name: 'employeeDept',
            message: "Which department?",
            choices: [],
            when: (answer) => answer.action == 'View employees by department'
        },
        {
            type: 'list',
            name: 'deptBudget',
            message: "Which department?",
            choices: [],
            when: (answer) => answer.action == 'View the total utilized budget of a department'
        },
    ])
}

startPrompt();