const inquirer = require("inquirer");

const addRole = function(){
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Please enter the name of the role: ',
            validate: (answer) => {
                if(!answer) {
                    console.log('Please enter a role!');
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please enter the role salary: ',
            validate: (answer) => {
                if(!answer) {
                    console.log('Please enter a salary!');
                    return false;
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'Please enter the department the role: ',
            validate: (answer) => {
                if (!answer) {
                    console.log('Please enter a salary!');
                    return false;
                }
                return true;
            }
        }
    ])
}