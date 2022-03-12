const { startPrompt } = require('../index');
const inquirer = require("inquirer");
const db = require('../db/connection');

const viewEmployees = function() {
    const req = "SELECT * FROM employees";
    db.query(req, function(err, res){
        if (err) throw err;
        console.table(res);
        inquirer.prompt({
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to do anything else?',
        })
        .then((answer) => {
            if(answer){
                startPrompt();
            }
            console.log('Thanks! Have a great day!');
            process.exit();
        })
        .catch((err)=> {
            if(err) {
                console.log(err);
            }
        })
    })
}

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
            type: 'list',
            name: 'employeeManager',
            message: "Please select the employee's manager: ",
            choices: [/*list of manager goes here*/]
            /*validate: employeeManager => {
                if(!employeeManager) {
                    console.log('Please enter employee Manager!')
                    return false;
                }
                return true; 
            },
            when: (answer) => answer.employeeRole == /.az/ + 'manager'*/
        }
    ])
    .then((res) => {
        
        db.query('INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)',
        [res.id += 1, res.firstName, res.lastName, res.employeeRole, res.employeeManager ]),
        function(err, res) {
            if (err) throw err;
            console.table(res);
            inquirer.prompt({
                type: 'confirm',
                name: 'continue',
                message: 'Would you like to do anything else?',
            })
            .then((answer) => {
                if(answer){
                    startPrompt();
                }
                console.log('Thanks! Have a great day!');
                process.exit();
            })
        }
    })
}

const updateEmployeeRole = function() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'which Employee would you like to update?',
            choices: [/* list of Employees goes here */]
            /*validate: firstName => {
                if(!firstName) {
                    console.log('Please enter a first name!')
                    return false;
                }
                return true; 
            }*/
        },
        {
            type: 'rawlist',
            name: 'employeeRole',
            message: 'which role would you like to assign to the employee?',
            choices: [/*List of roles */]
        }
    ])
    .then((employee) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [employee.employeeRole, employee.id],
        (err, employee) => {
            if(err) throw err;
            console.table(employee);
            inquirer.prompt({
                type: 'confirm',
                name: 'continue',
                message: 'Would you like to do anything else?',
            })
            .then((answer) => {
                if(answer){
                    startPrompt();
                }
                console.log('Thanks! Have a great day!');
                process.exit();
            })
        }
    )}
)}

module.exports = { addEmployee, viewEmployees, employeePrompt, updateEmployeeRole };