
const business = require('../js/queries')

const roleOpts = async () => {
    const tempArr = await business.getRoleIds();
  
    const options = tempArr[0];
  
    var optionsArray = [];
  
    options.forEach((element) => {
      let obj = {
        name: element.title,
        value: element.id
      }
      optionsArray.push(obj);
    });
  
    return optionsArray;
}

module.exports = roleOpts;