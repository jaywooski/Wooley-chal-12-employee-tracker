
const business = require('../js/queries')


  
const employeeOpts = async () => {
    const tempArr = await business.getEmpRaw();

    const options = tempArr[0];

    var optionsArray = [];

    options.forEach((element) => {
        let obj = {
        name: element.first_name + ' ' + element.last_name,
        value: element.id
        }
        optionsArray.push(obj);
    });

    return optionsArray;
}

const managerOpts = async () => {
    const tempArr = await business.getManagers();
    
    const options = tempArr[0];
  
    var optionsArray = [];
  
    choices.forEach((element) => {
      let obj = {
        name: element.manager_name,
        value: element.id
      }
      optionsArray.push(obj);
    });
  
    return optionsArray;
  
}

const underManagementOpts = async () => {
    const tempArr = await business.getNonManagers();
    
    const options = tempArr[0];
  
    var optionsArray = [];
  
    options.forEach(element => {
      let obj = {
        name: element.employee_name,
        value: element.id
      }
      optionsArray.push(obj);
    });
  
    return optionsArray;
  
}
module.exports = { employeeOpts, managerOpts, underManagementOpts };