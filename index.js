const inquirer = require('inquirer');
const business = require('./js/queries');
const mysql = require('mysql2');
const db = require('./db/connection');

db.connect(async function() {
    start();
})

function start() {
    const business = new Business();
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
                viewDepts();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break; 
            case 'View employees by manager':
                viewEmployeeByManager();
                break;
            case 'View employees by department':
                viewEmployeeByDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Delete a department':

                break;
            default:
                break;
        }
    })
}


  
  // add an employee
  const newEmployee = async () => {
  
    const roleArr = await cHelper.roleChoices();
  
    const mgmtArr = await cHelper.mgmtChoices();
  
    const emp = await inquirer.prompt([
        {
          type: "input",
          name: "first",
          message: "What is the Employees First Name?",
          validate: (first) =>{
            if (first && isNaN(first)) {
              return true;
            } else {
              console.log(" Please Enter a Name!")
              return false;
            }
          },
       },
       {
        type: "input",
        name: "last",
        message: "What is the Employees Last Name?",
        validate: (last) =>{
          if (last && isNaN(last)) {
            return true;
          } else {
            console.log(" Please Enter a Name!")
            return false;
          }
        },
      },
      {
        type: "list",
        name: 'role_id',
        message: "What is the Employees Role?",
        choices: roleArr,
        loop: false,
      },
      {
        type: "list",
        name: 'manager_id',
        message: "Who is the Employees Manager?",
        choices: mgmtArr,
      }
     ]);
  
    await business.addEmployee(emp);
  
    start();  
   
  }
  
  // Add a role
  const newRole = async () => {
  
    const choicesArr = await cHelper.deptChoices();
  
    const role = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the Role?",
          validate: (title) =>{
            if (title) {
              return true;
            } else {
              console.log(" Please Enter a Role Name!")
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
             console.log(" Please Enter a Role Salary");
           }
         }
       },
       {
        type: "list",
        name: 'department_id',
        message: "What Department is the Role associated with?",
        choices: choicesArr,
        loop: false,
      }
     ]);
  
    await business.addRole(role);
  
    chooseRequest();  
   
  }
  
  // Delete and Employee
  const deleteEmployee = async () => {
    const empArr = await cHelper.NonMgmtChoices();
  
    const emp = await inquirer.prompt([
      {
        type: "list",
        name: "emp_id",
        message: "What Employee do you want to Delete?",
        choices: empArr,
        loop: false,
      }
     ]);
  
    await business.deleteEmployee(emp);
  
    start();
  
  }
  
  // Update an employees role
  const updateEmpRole = async () => {
  
    const roleArr = await cHelper.roleChoices();
  
    const empArr = await cHelper.empChoices();
  
    const emp = await inquirer.prompt([
      {
        type: "list",
        name: "emp_id",
        message: "What is the Employee do you want to update?",
        choices: empArr,
        loop: false,
      },
      {
        type: "list",
        name: 'role_id',
        message: "What is the Employees Role?",
        choices: roleArr,
        loop: false,
      }
     ]);
  
    await business.updateEmpRoleById(emp);
  
    chooseRequest();  
   
  }