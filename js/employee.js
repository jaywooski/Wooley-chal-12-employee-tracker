const { startPrompt } = require('../index');
const inquirer = require("inquirer");

const employeePrompt = function(answer){
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeManager',
            message: "Which manager?",
            choices: [],
            when: answer.action == 'View employees by manager'
        },
        {
            type: 'list',
            name: 'employeeDept',
            message: "Which department?",
            choices: [],
            when: answer.action == 'View employees by department'
        }     
    ])
}


const addEmployee = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter employee first name: ',
            validate: firstName => {
                if(!firstName) {
                    console.log('Please enter a first name!')
                    return false;
                }
                return true; 
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter employee last name: ',
            validate: lastName => {
                if(!lastName) {
                    console.log('Please enter a last name!')
                    return false;
                }
                return true; 
            }
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: 'Enter employee role name: ',
            validate: employeeRole => {
                if(!employeeRole) {
                    console.log("Please enter the employee's role!")
                    return false;
                }
                return true; 
            }
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: "Please enter the employee's manager: ",
            validate: employeeManager => {
                if(!employeeManager) {
                    console.log('Please enter employee Manager!')
                    return false;
                }
                return true; 
            },
            when: (answer) => answer.employeeRole == /.az/ + 'manager'
        }
    ])
}