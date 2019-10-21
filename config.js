const fs = require('fs');
const fileConfig = {};
const conf = fs.readFileSync('./filedConfig.conf');
const confArr = conf.toString().split('\n');
for(let i = 0; i < confArr.length; i++) {
  const tempArr = confArr[i].split('=');
  fileConfig[tempArr[0].trim()] = tempArr[1].trim();
}

module.exports = fileConfig