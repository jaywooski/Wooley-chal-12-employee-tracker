
const business = require('../js/queries')


const deptChoices = async () => {
    const tempArr = business.viewDepts()
    .then(([depts]) => {
      
      options.push(depts);
      return options;
    })  

    // const options = tempArr[0];
    
  
    // var optionsArray = [];
  
    // options.forEach((element) => {
    //   let obj = {
    //     name: element.dept_name,
    //     value: element.id
    //   }
    //   optionsArray.push(obj);
    // });
  
    // return optionsArray;
}

module.exports = deptChoices;