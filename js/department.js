
const business = require('../js/queries')


const deptChoices = async () => {
    const tempArr = await business.getDepts();
  
    const options = tempArr[0];
  
    var optionsArray = [];
  
    options.forEach((element) => {
      let obj = {
        name: element.department_name,
        value: element.id
      }
      optionsArray.push(obj);
    });
  
    return optionsArray;
}

module.exports = deptChoices;