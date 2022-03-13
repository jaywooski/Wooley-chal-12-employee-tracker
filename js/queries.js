class Business {
    constructor(db){
      this.db = db;
    }
  
    addDept(info) {
      const values = [info.name];
      return this.db
        .promise()
        .query(`INSERT INTO department (department_name) VALUES(?)`, values);
    }
  
    addRole(info) {
      const values = [info.title, info.salary, info.department_id];
      return this.db
        .promise()
        .query(`INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`, values);
    }
  
    addEmployee(info) {
      const values = [info.first, info.last, info.role_id, info.manager_id];
      return this.db
        .promise()
        .query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`, values)
    }
  
    deleteEmployee(info) {
      const values = [info.emp_id];
      return this.db
        .promise()
        .query(`DELETE FROM employee WHERE id = ?`, values)
    }
  
    updateEmpRoleById(info) {
      const values = [info.role_id, info.emp_id];
      return this.db
        .promise()
        .query(`UPDATE employee SET role_id = ? WHERE id = ?`, values)
    }
  
    
  
    viewDepts() {
      return this.db
        .promise()
        .query(`SELECT * FROM department`);
    }
  
    viewRoles() {
        return this.db
        .promise()
        .query(
        `SELECT r.title AS Title, 
        r.salary AS Salary, 
        d.department_name AS Department
        FROM role r
        LEFT JOIN department d
        ON r.department_id = d.id
        ORDER BY Department, r.id ASC`
        );
    }
  
    getRoleIds(){
      return this.db
        .promise()
        .query(
        `SELECT *
        FROM role`
        );
    }
  
    getEmployees() {
      return this.db
        .promise()
        .query(
        `SELECT e.id as 'Employee_ID', 
                e.first_name AS 'First_Name',
                e.last_name AS 'Last_Name',
                department.department_name AS Department,
                role.salary AS Salary,
                role.title AS Role,
                CONCAT(mgmt.first_name,' ',mgmt.last_name) as Manager
        FROM employee e
        LEFT JOIN employee mgmt
        ON e.manager_id = mgmt.id 
        INNER JOIN role
        ON e.role_id = role.id 
        LEFT JOIN department 
        ON role.department_id = department.id
        ORDER BY e.id;`
        );
    }
  
    getEmpRaw() {
      return this.db
      .promise()
      .query(
          `SELECT e.id, 
           e.first_name,
           e.last_name
           FROM employee e`
          )
    }
  
    getNonManagers(){
      return this.db
      .promise()
      .query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name
      FROM employee 
      WHERE manager_id IS NOT NULL`
    )
    }
  
    getManagers() {
      return this.db
        .promise()
        .query(
            `SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name
        FROM employee 
        WHERE manager_id IS NULL`
      )
    }
  
    // getEmpByDeptId(info) {
    //   const values = [info.dept_id]
    //   return this.db
    //     .promise()
    //     .query(`SELECT e.first_name AS "First Name" , e.last_name AS "Last Name", d.department_name AS Department
    //       FROM employee e
    //       INNER JOIN role r
    //       ON e.role_id = r.id
    //       INNER JOIN department d
    //       ON r.department_id = d.id
    //       WHERE d.id = ?`,
    //       values
    //     );
    // }
  
    // getEmployeeByManagerId(info) {
    //   const values = [info.manager_id]
    //   return this.db
    //     .promise()
    //     .query(
    //       `SELECT e.first_name AS "First Name" , 
    //               e.last_name AS "Last Name", 
    //               CONCAT(mgmt.first_name, ' ', mgmt.last_name) AS Manager
    //       FROM employee e
    //       INNER JOIN employee mgmt
    //       ON e.manager_id = mgmt.id 
    //       WHERE e.manager_id = ?`,
    //       values
    //     );
    // }
  
    // getBudgetByDept() {
    //   return this.db
    //     .promise()
    //     .query(
    //   `SELECT d.department_name AS Department, 
    //           SUM(r.salary) AS Budget
    //   FROM role r
    //   INNER JOIN department d
    //   ON r.department_id = d.id
    //   GROUP BY department_name`,
    //   );
    // }
}
  

module.exports = new infobaseQuery(db);