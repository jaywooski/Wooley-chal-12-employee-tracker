const inquirer = require("inquirer");
const db = require('../db/connection')
const { startPrompt } = require('../index');

const viewRoles = function() {
    const req = "SELECT * FROM role";
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
            choices: [/* variable for list of departments to be updated */],
        }
    ])
    .then((res) => {
        
        db.query('INSERT INTO role(id, title, salary, department_id) VALUES (?,?,?,?)',
        [res.id += 1, res.roleName, res.roleSalary, res.roleDept ]),
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

module.exports = { addRole, viewRoles }