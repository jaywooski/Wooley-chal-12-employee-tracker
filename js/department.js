const inquirer = require("inquirer");

const departmentPrompt = function() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleAdd',
            message: "What role would you like to add?",
            when: (answer) => answer.action == 'Add a role'
        },
        {
            type: 'input',
            name: 'deptAdd',
            message: "What department would you like to add?",
            when: (answer) => answer.action == 'Add a department'
        },
    ])
}