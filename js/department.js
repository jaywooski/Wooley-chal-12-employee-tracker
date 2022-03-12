const { startPrompt } = require('../index');
const inquirer = require("inquirer");
const db = require('../db/connection')

const viewDepartments = function() {
    const req = "SELECT * FROM department";
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

// const viewDeptBudget = function() {
//     inquirer.prompt(
//         {
//             type: 'list',
//             name: 'deptBudget',
//             message: "Which department?",
//             choices: [/* variable for list of departments to be updated */]
//         }
//     )
//     .then((data) => {
//         db.query('SELECT ')
//     })
// }

const addDept = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: "Please type the name of the department you'd like to add: "
        },
    ])
    .then((res) => {
        
        db.query('INSERT INTO department(id, name) VALUES (?,?)',
        [res.id += 1, res.deptName ]),
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

module.exports = viewDepartments, addDept;