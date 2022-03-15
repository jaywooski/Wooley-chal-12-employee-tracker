const inquirer = require('inquirer');
const business = require('./js/queries');
const rolesFuncs = require('./js/role');
const employeeFuncs = require('./js/employee');
const deptFuncs = require('./js/department');
const tableLog = require('console.table')
const connection = require("./db/connection");


function start() {
    

    inquirer.prompt([
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
                'Add a role',
                'Add a department',
                'Add an employee',
                'Delete a department',
                'Update an employee role'
            ]
        }
    ])
    .then((data) => {
        const choice = data.action;
        
        switch (choice) {
            case 'View all departments':
                showDepts();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break; 
            case 'View employees by manager':
                
                break;
            case 'View employees by department':
                
                break;
            case 'Add a role':
                
                break;
            case 'Add a department':
                
                break;
            case 'Add an employee':
                
                break;
            case 'Delete a department':

                break;
            default:
                break;
        }
    })
}


const showDepts = () => {
    

    business.viewDepts()
  
    .then(([rows]) => {
      console.log('\n');
        console.log(tableLog.getTable(rows));
    })
    .then(()=> {
        start();
    }) 

}


const viewRoles = function() {
    business.viewRoles()
  
    .then(([rows]) => {
      console.log('\n');
      console.log(tableLog.getTable(rows));
    })
    .then(()=> {
        start();
    }) 
}


const viewEmployees = function(){
    business.getEmployees()
  
    .then(([rows]) => {
      console.log('\n');
      console.log(tableLog.getTable(rows));
    })
    .then(()=> {
        start();
    }) 
}

const newEmployee = async () => {

    const roles = await rolesFuncs.roleChoices();

    const managers = await employeeFuncs.managerOpts();

    const employee = await inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What is the Employees First Name?",
            validate: (answer) =>{
                if (answer && isNaN(answer)) {
                    return true;
                } else {
                    console.log(" Please enter the employee's name!")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "last",
            message: "What is the Employees Last Name?",
            validate: (answer) =>{
                if (answer && isNaN(answer)) {
                return true;
                } else {
                console.log(" Please enter the employee's last name!")
                return false;
                }
            }
        },
        {
            type: "list",
            name: 'role_id',
            message: "What is the Employees Role?",
            choices: roles
        },
        {
            type: "list",
            name: 'manager_id',
            message: "Who is the Employees Manager?",
            choices: managers,
        }
    ]);

    await business.addEmployee(employee);

    start();  

}
  
  
  const newRole = async () => {
  
    const deptArr = await deptFuncs.deptChoices();
  
    const role = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Role?",
          validate: (name) =>{
            if (name) {
              return true;
            } else {
              console.log(" Please enter the name of the position role!")
              return false;
            }
          },
       },
       {
         type: "input",
         name: 'salary',
         message: "What is the Salary of the Role?",
         validate: (salary) =>{
           if(salary && !isNaN(salary)){
             return true;
           } else {
             console.log(" Please enter how much the role pays!");
           }
         }
       },
       {
        type: "list",
        name: 'department_id',
        message: "Which department is the role associated with?",
        choices: deptArr
      }
     ]);
  
    await business.addRole(role);
  
    start();  
   
}
  

const deleteEmployee = async () => {
    const employees = await underManagementOpts.getNonManagers();

    const employee = await inquirer.prompt(
        {
            type: "list",
            name: "emp_id",
            message: "What Employee do you want to Delete?",
            choices: empArr
        }
        );

    await business.deleteEmployee(employee);

    start();

}
  

const updateEmpRole = async () => {

    const roles = await rolesFuncs.roleChoices();

    const employees = await employeeFuncs.underManagementOpts();

    const employee = await inquirer.prompt([
        {
        type: "list",
        name: "emp_id",
        message: "What is the Employee do you want to update?",
        choices: employees
        },
        {
        type: "list",
        name: 'role_id',
        message: "What is the Employees Role?",
        choices: roles
        }
        ]);

    await business.updateEmpRoleById(employee);

    start();  

}

start();